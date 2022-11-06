---
type: article
title: 'Pre-processing CSS: Generate Utility Classes Using Sass – Part 1'
image: /blog/preprocessing-css-generate-utility-classes-using-sass/featured.png
description: Generate CSS utility classes or helpers using advanced Sass features – loops, maps and type-checker guards.
publishedOn: 17 October 2022 16:45

head:
  - - meta
    - property: og:title
      content: 'Pre-processing CSS: Generate Utility Classes Using Sass – Part 1'
  - - meta
    - property: og:description
      content: Generate CSS utility classes or helpers using advanced Sass features – loops, maps and type-checker guards.
  - - meta
    - property: keywords
      content: css preprocessor, sass, scss, utility class
  - - meta
    - property: og:type
      content: article
  - - meta
    - property: og:url
      content: https://lazarkulasevic.github.io/blog/preprocessing-css-generate-utility-classes-using-sass.html
  - - meta
    - property: og:image
      content: https://lazarkulasevic.github.io/blog/preprocessing-css-generate-utility-classes-using-sass/featured.png
  - - meta
    - name: twitter:title
      content: 'Pre-processing CSS: Generate Utility Classes Using Sass – Part 1'
  - - meta
    - name: twitter:description
      content: Generate CSS utility classes or helpers using advanced Sass features – loops, maps and type-checker guards.
  - - meta
    - property: og:url
      content: https://lazarkulasevic.github.io/blog/preprocessing-css-generate-utility-classes-using-sass.html
  - - meta
    - name: twitter:image
      content: https://lazarkulasevic.github.io/blog/preprocessing-css-generate-utility-classes-using-sass/featured.png
---

When it comes to styling, you know what I really like? Utility classes! All the boring stuff about styling such as spacing, coloring, text formatting, etc. can be easily handled by using a utility class (e.g., `m-sm` – margin small, `color-primary`, `font-lg` – font-size large). As it turned out, I'm not the sole fan of this approach to CSS architecture. There are lots of devs out there preferring small and single-purpose classes than large semantic ones. This movement in front-end is named _Atomic CSS_, and it is gaining on velocity as we speak.

Including these in your project can be easily done by including a CSS library such as Bootstrap, TailwindCSS or any other that provides utility classes out of the box. However, from my perspective, this approach is not recommended when you just want to use spacing helpers, because they usually come as a _secondary feature_. You will end up installing the whole package with all its components and features and use only a small fraction. This may produce a negative effect to your bundle size and app performance accordingly.

Since we are going to write our own utility classes, we now have the power to dictate the nomenclature. However, I wouldn't get too creative about these, because the name should be as short as possible, uniform and yet intuitive enough to be easily memorable.

::: tip TL;DR
Introducing the concept of pre-processing styles using Sass/Scss. If you are already familiar with the concept and you are just looking for a code snippet that generates utilities for spacing, skip to the [last heading](#end-result).
:::

### Spacing Utilities

In today's article, we are going to handle spacings only. Our Scss code (e.g., `input.scss`) will be compiled into CSS code (`output.css`) that will contain a bunch of similar-looking classes like ones in the example below.

The advantage of Sass pre-processor is in its unique syntax and flexibility achieved with features such as variables, nested rules, loops, mixins, etc. Once written, code goes through the compiler and generates CSS code as output.

```css
/* output.css */
.m-8 {
    margin: 8px !important;
}

@media (min-width: 480px) {
    .mt-sm-16 {
        margin-top: 16px !important;
    }
}

@media (min-width: 768px) {
    .mx-md-32 {
        margin-left: 32px !important;
        margin-right: 32px !important;
    }
}
```

To get there, we're going to take a walk through the whole process. I am going to use vanilla Javascript and Vite as a bundler. You can either [clone my repo](https://github.com/lazarkulasevic/css-utility-classes) or follow the steps:

1. Create Vite project and pick vanilla Javascript boilerplate:

```text
npm create vite@latest
```

2. Install Sass:

```text
npm i sass -D
```

Now let's create two partial files and name them `_config.scss` and `_spacing.scss`. In _config_ file we're going to declare a map with key-value pairs that will be consumed in _spacing_ file to generate utility classes like those in the `output.css` file.

```scss
// _config.scss
$spacing: (
    0: 0px,
    8: 8px,
    16: 16px,
    32: 32px,
    64: 64px
);
```

Then, the logic comes into play. By looping through `$properties` and `$spacing` maps, the preprocessor generates classes containing `margin` or `padding` property with values in pixels.

```scss
// _spacing.scss
@use "config" as *;
$properties: ("m": margin, "p": padding);

@each $prefix, $property in $properties {
    @each $suffix, $space in $spacing {
        .#{$prefix}-#{$suffix} {
            #{$property}: #{$space} !important;
        }
    }
}
```

Okay, we've got that one covered. Next we are going to do is to cover cases for each direction and axis.

```scss
// _spacing.scss
@use "config" as *;

$properties: ("m": margin, "p": padding);
$directions: ("t": top, "b": bottom, "l": left, "r": right);
$axes: "y", "x";

// Mapping $spacing values per $property

@each $prefix, $property in $properties {
    @each $suffix, $space in $spacing {
        .#{$prefix}-#{$suffix} {
            #{$property}: #{$space} !important;
        }
    }
}

// Mapping $spacing values per $property and $direction

@each $prefix, $property in $properties {
    @each $abbr-dir, $direction in $directions {
        @each $suffix, $space in $spacing {
            .#{$prefix}#{$abbr-dir}-#{$suffix} {
                #{$property}-#{$direction}: #{$space} !important;
            }
        }
    }
}

// Mapping $spacing values per $property and $axis

@each $prefix, $property in $properties {
    @each $axis in $axes {
        @each $suffix, $space in $spacing {
            .#{$prefix}#{$axis}-#{$suffix} {
                @if $axis == "y" {
                    #{$property}-top: #{$space} !important;
                    #{$property}-bottom: #{$space} !important;
                } @else if $axis == "x" {
                    #{$property}-left: #{$space} !important;
                    #{$property}-right: #{$space} !important;
                }
            }
        }
    }
}
```



Now we just need to analyze our code and look for potential improvements.

### Minor Refactor #1

You may recognize a repetitive pattern in our nested loops. We are looping through `$properties` and `$spacing` three times, that is for each orientation individual and per axis, which can be simplified by nesting them together and loop through each of them one time only for all cases.

```scss
@each $prefix, $property in $properties {
    @each $suffix, $space in $spacing {
        // Cover all cases here
    }
}
```

Now cover all other cases. The first set that produces all-direction spacing (`m-8` or `p-8`) is generated without additional loops. But direction and axis-oriented spacings each need one additional loop.

```scss {7,13}
@each $prefix, $property in $properties {
    @each $suffix, $space in $spacing {
        .#{$prefix}-#{$suffix} {
            #{$property}: #{$space} !important;
        }

        @each $abbr-dir, $direction in $directions {
            .#{$prefix}#{$abbr-dir}-#{$suffix} {
                #{$property}-#{$direction}: #{$space} !important;
            }
        }

        @each $axis in $axes {
            .#{$prefix}#{$axis}-#{$suffix} {
                @if $axis == "y" {
                    #{$property}-top: #{$space} !important;
                    #{$property}-bottom: #{$space} !important;
                } @else if $axis == "x" {
                    #{$property}-left: #{$space} !important;
                    #{$property}-right: #{$space} !important;
                }
            }
        }
    }
}
```

The job is almost done. To complete it, all we need to do is to add a validator to prevent developer from assigning values to `$spacing` that either `margin` or `padding` property doesn't accept, such as `auto`, because `padding: auto;` is not valid. For this purpose, we're going to create `_mixins.scss` and inside that file declare `validate-unit` which will be used in `_spacing.scss`.

```scss
// _mixins.scss
@mixin validate-unit($value, $value-type, $units...) {
    @if type-of($value) != $value-type or index($units, unit($value)) == null {
        @error "Invalid unit #{unit($value)} for value #{$value}.";
    }
}
```

The resulting Scss will give us what we initially wanted – utility classes for spacing. We can use them to set spacings without "polluting" our css files with margin or padding properties. Pretty neat!

```scss {11}
// _spacing.scss
@use "config" as *;
@use "mixins" as *;

$properties: ("m": margin, "p": padding);
$directions: ("t": top, "b": bottom, "l": left, "r": right);
$axes: "y", "x";

@each $prefix, $property in $properties {
    @each $suffix, $space in $spacing {
        @include validate-unit($space, number, px);
        
        .#{$prefix}-#{$suffix} {
            #{$property}: #{$space} !important;
        }

        @each $abbr-dir, $direction in $directions {
            .#{$prefix}#{$abbr-dir}-#{$suffix} {
                #{$property}-#{$direction}: #{$space} !important;
            }
        }

        @each $axis in $axes {
            .#{$prefix}#{$axis}-#{$suffix} {
                @if $axis == "y" {
                    #{$property}-top: #{$space} !important;
                    #{$property}-bottom: #{$space} !important;
                } @else if $axis == "x" {
                    #{$property}-left: #{$space} !important;
                    #{$property}-right: #{$space} !important;
                }
            }
        }
    }
}
```

Alright, we have a fully functioning utility class generator with a unit-check guard. The `$spacing` map now only receives numerical values in `px`, `em` or `rem`.

My job here is done. (long pause) **NOT!** :stuck_out_tongue_winking_eye:

Almost every single website or app today is responsive. That means we cannot use our spacings as they are, but we need to upgrade them to accept breakpoints too, so that we can dynamically change spacing based on the screen size:

```html
<div class="m-8 m-sm-16 m-md-32 m-lg-64">
    Hi mom!
</div>
```

### Adding Breakpoints

First, `$breakpoints` are configurable, hence they'll go to `_config.scss`.

```scss
// _config.scss
$spacing: (...);
$breakpoints: (
    "xs": 375px,
    "sm": 480px,
    "md": 768px,
    "lg": 1080px,
    "xl": 1440px,
    "xxl": 1920px
);
```

Second, they have to be included in the (grand)parent loop because of the cascade rule (mobile-first web design). We are dictating the generation of utility classes to increase `min-width` from top to bottom and we want them to be grouped together by breakpoint.

### End Result

Fully functioning utility class generator.

```scss
// _spacing.scss
@use "config" as *;
@use "mixins" as *;

$properties: ("m": margin, "p": padding);
$directions: ("t": top, "b": bottom, "l": left, "r": right);
$axes: "y", "x";

// classes without breakpoint abbreviation (i.e. m-16)

@each $prefix, $property in $properties {
    @each $suffix, $space in $spacing {
        @include validate-unit($space, number, px);
        
        .#{$prefix}-#{$suffix} {
            #{$property}: #{$space} !important;
        }

        @each $abbr-dir, $direction in $directions {
            .#{$prefix}#{$abbr-dir}-#{$suffix} {
                #{$property}-#{$direction}: #{$space} !important;
            }
        }

        @each $axis in $axes {
            .#{$prefix}#{$axis}-#{$suffix} {
                @if $axis == "y" {
                    #{$property}-top: #{$space} !important;
                    #{$property}-bottom: #{$space} !important;
                } @else if $axis == "x" {
                    #{$property}-left: #{$space} !important;
                    #{$property}-right: #{$space} !important;
                }
            }
        }
    }
}

// classes WITH breakpoint abbreviation (i.e. m-sm-16)

@each $breakpoint, $breakpoint-value in $breakpoints {
    @media (min-width: $breakpoint-value) {
        @each $prefix, $property in $properties {
            @each $suffix, $space in $spacing {
                // we don't need to validate unit here as well

                .#{$prefix}-#{$breakpoint}-#{$suffix} {
                    #{$property}: #{$space} !important;
                }

                @each $axis in $axes {
                    .#{$prefix}#{$axis}-#{$breakpoint}-#{$suffix} {
                        @if $axis == "y" {
                            #{$property}-top: #{$space} !important;
                            #{$property}-bottom: #{$space} !important;
                        } @else if $axis == "x" {
                            #{$property}-left: #{$space} !important;
                            #{$property}-right: #{$space} !important;
                        }
                    }
                }

                @each $abbr-dir, $direction in $directions {
                    .#{$prefix}#{$abbr-dir}-#{$breakpoint}-#{$suffix} {
                        #{$property}-#{$direction}: #{$space} !important;
                    }
                }
            }
        }
    }
}
```

Instead of writing about 2000 lines of repetitive CSS (that is subjected to human error), we have achieved the same thing in under 100 lines of SCSS. 

The hustle we went through really pays off! (a bit shorter pause) Or does it?! :monocle_face:

### Potential Performance Issue

What if hypothetically we end up using only a few of these classes in our project. For example, your team has decided to handle spacing by adding only bottom margin and x-axis padding to elements. Don't worry, there's a solution for that too. 

Cleaning up unused CSS with a post-processor will be covered in the article **Part 2**.
