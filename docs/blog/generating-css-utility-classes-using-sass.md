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

When it comes to styling, you know what I really like? Utility classes! All the boring stuff about styling such as spacing, coloring, text formatting, etc. can be easily handled by simply using a utility class (`m-sm` – margin small, `color-primary`, `font-lg` – font-size large). 

Including these in your project can be easily done by including a CSS library such as Bootstrap, TailwindCSS or any other that provides utility classes out of the box. However, from my perspective, this approach is not recommended when you just want to use utilities, because they usually come as a *secondary feature*. You will end up installing the whole package with all its components and features and use only a fraction. This may produce a negative effect to your bundle size and app performance accordingly.

Since we are going to write our own utility classes, we now have the power to dictate the nomenclature. However, I wouldn't get too creative about these, because the name should be as short as possible, uniform and yet intuitive enough to be easily memorable.

::: tip TL;DR
Introducing the concept of pre-processing styles using Sass/Scss. If you are already familiar with the concept and you are just looking for a code snippet that generates utilities for spacing, skip to the [last heading](#end-result).
:::

### Spacing Utilities

In today's article, we are going to handle spacings only. Our Scss code (e.g., `input.scss`) will be compiled into CSS code (`output.css`) that will contain a bunch of similar-looking classes like ones in the example below.

The advantage of Sass pre-processor is in its unique syntax and flexibility achieved with features such as variables, nested rules, loops, mixins, etc. Once written, code goes through the compiler and generates CSS code as output.

```css
/* output.css */
.m-sm {
    margin: 12px !important;
}

.mx-md {
    margin-left: 24px !important;
    margin-right: 24px !important;
}

.mt-sm {
    margin-top: 12px !important;
}
```

To get there, we're going to take a walk through the process which — when you put it all together — turns out to be quite simple. Let's create two partial files and name them `_config.scss` and `_spacing.scss`. In *config* file we're going to declare a map with key-value pairs that will be consumed in *spacing* file to generate utility classes like those in the `output.css` file.

```scss
// _config.scss
$spacing: (
    "lg": 64px,
    "md": 32px,
    "sm": 16px,
    "xs": 8px,
    "none": 0px
);
```

Then, the logic comes into play. By looping through `$selectors` and `$spacing` maps, the preprocessor generates classes containing `margin` or `padding` property with values in pixels.

```scss
// _spacing.scss
@use "config" as *;
$selectors: ("m": margin, "p": padding);

@each $prefix, $selector in $selectors {
    @each $suffix, $space in $spacing {
        .#{$prefix}-#{$suffix} {
            #{$selector}: #{$space} !important;
        }
    }
}
```

Okay, we've got that one covered. Next we are going to do is to cover cases for each direction and axis.

```scss
// _spacing.scss
@use "config" as *;

$selectors: ("m": margin, "p": padding);
$directions: ("t": top, "b": bottom, "l": left, "r": right);
$axes: "y", "x";

// Mapping $spacing values per $selector

@each $prefix, $selector in $selectors {
    @each $suffix, $space in $spacing {
        .#{$prefix}-#{$suffix} {
            #{$selector}: #{$space} !important;
        }
    }
}

// Mapping $spacing values per $selector and $direction

@each $prefix, $selector in $selectors {
    @each $abbr-dir, $direction in $directions {
        @each $suffix, $space in $spacing {
            .#{$prefix}#{$abbr-dir}-#{$suffix} {
                #{$selector}-#{$direction}: #{$space} !important;
            }
        }
    }
}

// Mapping $spacing values per $selector and $axis

@each $prefix, $selector in $selectors {
    @each $axis in $axes {
        @each $suffix, $space in $spacing {
            .#{$prefix}#{$axis}-#{$suffix} {
                @if $axis == "y" {
                    #{$selector}-top: #{$space} !important;
                    #{$selector}-bottom: #{$space} !important;
                } @else if $axis == "x" {
                    #{$selector}-left: #{$space} !important;
                    #{$selector}-right: #{$space} !important;
                }
            }
        }
    }
}
```

That's it, all cases are covered. Now we just need to analyze our code and look for potential improvements.

### Minor Refactor

We can recognize a repetitive pattern in our nested loops. We are looping through `$selectors` and `$spacing` three times, that is for each orientation individual and per axis. That can be simplified by nesting them together and loop through each of them one time only for all cases.

```scss
@each $prefix, $selector in $selectors {
    @each $suffix, $space in $spacing {
        // Cover all cases here
    }
}
```

Now cover all other cases. The first set that produces all-direction spacing (`m-sm` or `p-sm`) is generated without additional loops. But direction and axis-oriented spacings each need one additional loop.

```scss {7,13}
@each $prefix, $selector in $selectors {
    @each $suffix, $space in $spacing {
        .#{$prefix}-#{$suffix} {
            #{$selector}: #{$space} !important;
        }

        @each $abbr-dir, $direction in $directions {
            .#{$prefix}#{$abbr-dir}-#{$suffix} {
                #{$selector}-#{$direction}: #{$space} !important;
            }
        }

        @each $axis in $axes {
            .#{$prefix}#{$axis}-#{$suffix} {
                @if $axis == "y" {
                    #{$selector}-top: #{$space} !important;
                    #{$selector}-bottom: #{$space} !important;
                } @else if $axis == "x" {
                    #{$selector}-left: #{$space} !important;
                    #{$selector}-right: #{$space} !important;
                }
            }
        }
    }
}
```

The job is almost done. To complete it, all we need to do is to add type checker to prevent developer from assigning values to `$spacing` that either `margin` or `padding` property doesn't accept, such as `auto`, because `padding: auto;` is not valid. 

### End Result

Done and done! We have a fully functioning utility class generator with a type-check guard. The `$spacing` map now only receives numerical values in px, em or rem.

```scss
// _spacing.scss
@use "config" as *;

$selectors: ("m": margin, "p": padding);
$directions: ("t": top, "b": bottom, "l": left, "r": right);
$axes: "y", "x";

@each $prefix, $selector in $selectors {
    @each $suffix, $space in $spacing {
        @if type-of($space) != "number" or index("px" "em" "rem", unit($space)) == null {
            @error "Invalid space value: #{$space}.";
        }
      
        .#{$prefix}-#{$suffix} {
            #{$selector}: #{$space} !important;
        }
      
        @each $abbr-dir, $direction in $directions {
            .#{$prefix}#{$abbr-dir}-#{$suffix} {
                #{$selector}-#{$direction}: #{$space} !important;
            }
        }
      
        @each $axis in $axes {
            .#{$prefix}#{$axis}-#{$suffix} {
                @if $axis == "y" {
                    #{$selector}-top: #{$space} !important;
                    #{$selector}-bottom: #{$space} !important;
                } @else if $axis == "x" {
                    #{$selector}-left: #{$space} !important;
                    #{$selector}-right: #{$space} !important;
                }
            }
        }
    }
}
```

Instead of writing 60 lines of repetitive CSS for only one spacing value, we have achieved the same thing in 40 lines of SCSS. Given the increased complexity in our code, that didn't turn out to be a good idea. Right? But, imagine you add more spacing values in map `$spacing`, for example 5 or 6 (xs, sm, md, lg, xl, xxl), you'll get 300-400 lines of generated CSS. Now the hustle we went through really pays off!

Or does it?!

### Potential Performance Issue

What if hypothetically we end up using only a few of these classes in our project. For example, your team has decided to handle spacing by adding only bottom margin and x-axis padding to elements. Don't worry, there's a solution for that too. 

Cleaning up unused CSS with a post-processor will be covered in the article **Part 2**.
