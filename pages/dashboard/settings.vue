<template>
  <div class="w-full min-h-[70vh] flex items-center justify-center px-4 font-satoshi">
    <div
      class="relative w-full max-w-xl rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl
             shadow-[0_24px_90px_rgba(0,0,0,0.60)] p-10 overflow-hidden"
    >
      <!-- glow -->
      <div class="pointer-events-none absolute -inset-1 opacity-60
                  bg-[radial-gradient(circle_at_top,rgba(122,167,255,0.22),transparent_55%)]"></div>

      <div class="relative flex flex-col items-center text-center gap-4">
        <span
          class="w-16 h-16 rounded-2xl bg-white/5 border border-white/10
                 flex items-center justify-center shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
        >
          <Icon name="mdi:clock-outline" size="34" class="text-[#7aa7ff]" />
        </span>

        <h1 class="text-3xl md:text-4xl font-black text-white tracking-tight">
          Coming Soon
        </h1>

        <p class="text-white/55 max-w-md">
          This feature is under development and will be available soon.
          <br />
          Stay tuned for updates!
        </p>

        <div class="mt-3 w-full flex items-center justify-center gap-2 text-xs text-white/50">
          <span class="h-2 w-2 rounded-full bg-[#7aa7ff]/70"></span>
          <span>Work in progress</span>
        </div>
      </div>
    </div>
  </div>
</template>
