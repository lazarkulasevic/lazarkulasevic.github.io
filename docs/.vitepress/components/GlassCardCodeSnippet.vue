<template>
  <div class="code-card">
    <div>
      <div class="language-js">
        <span class="copy"></span>
        <pre><code><span class="line"><span style="font-style:italic;" class="code--blue">while</span><span class="code--purple"> (working) </span><span class="code--blue">{</span></span>
<span class="line"><span>    </span><span class="code--purple">coffee</span><span class="code--blue">.</span><span class="code--green">drink</span><span class="code--purple">()</span></span>
<span class="line"><span>    </span><span class="code--purple">work</span><span class="code--blue">.</span><span class="code--green">execute</span><span class="code--purple">()</span></span>
<span class="line"><span>    </span><span style="font-style:italic;" class="code--blue">if</span><span class="code--purple"> (</span><span class="code--purple">coffee</span><span class="code--purple"> </span><span class="code--blue">===</span><span class="code--purple"> </span><span class="code--blue">'</span><span class="code--yellow">empty</span><span class="code--blue">'</span><span class="code--purple">) </span><span class="code--blue">{</span></span>
<span class="line"><span>        </span><span class="code--purple">coffee</span><span class="code--blue">.</span><span class="code--green">refill</span><span class="code--purple">()</span></span>
<span class="line"><span>    </span><span class="code--blue">}</span></span>
<span class="line"><span class="code--blue">}</span></span>
<span class="line"></span></code></pre>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@use '../style/variables' as *;

.code-card {
  padding: 0 20px;
  position: relative;
  font-size: 15px;
}

.code {
  &--red {
    color: $base-red;
  }

  &--blue {
    color: $base-blue;
  }

  &--green {
    color: $dark-green;
  }

  &--yellow {
    color: $base-yellow;
  }

  &--purple {
    color: $base-purple;
  }
}
</style>
