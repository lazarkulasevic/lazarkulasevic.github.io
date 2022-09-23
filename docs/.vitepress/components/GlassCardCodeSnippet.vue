<template>
    <div data-v-95b970be="" style="position: relative;"><div><div class="language-js"><span class="copy"></span><pre><code><span class="line"><span style="font-style:italic;" class="code--blue">while</span><span class="code--purple"> (working) </span><span class="code--blue">{</span></span>
<span class="line"><span>    </span><span class="code--purple">coffee</span><span class="code--blue">.</span><span class="code--green">drink</span><span class="code--purple">()</span></span>
<span class="line"><span>    </span><span class="code--purple">work</span><span class="code--blue">.</span><span class="code--green">execute</span><span class="code--purple">()</span></span>
<span class="line"><span>    </span><span style="font-style:italic;" class="code--blue">if</span><span class="code--purple"> (</span><span class="code--purple">coffee</span><span class="code--purple"> </span><span class="code--blue">===</span><span class="code--purple"> </span><span class="code--blue">'</span><span class="code--yellow">empty</span><span class="code--blue">'</span><span class="code--purple">) </span><span class="code--blue">{</span></span>
<span class="line"><span>        </span><span class="code--purple">coffee</span><span class="code--blue">.</span><span class="code--green">refill</span><span class="code--purple">()</span></span>
<span class="line"><span>    </span><span class="code--blue">}</span></span>
<span class="line"><span class="code--blue">}</span></span>
<span class="line"></span></code></pre></div></div></div>
</template>

<style lang="scss">
@use '../style/variables' as v;

.code {
    &--red {
        color: v.$base-red;
    }
    &--blue {
        color: v.$base-blue;
    }
    &--green {
        color: v.$base-green;
    }
    &--yellow {
        color: v.$base-yellow;
    }
    &--purple {
        color: v.$base-purple;
    }
}
</style>
