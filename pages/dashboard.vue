<template>
  <div class="relative min-h-screen w-full overflow-x-hidden bg-[#05060a] text-white font-satoshi">
    <!-- Background layers (igual vibe da landpage) -->
    <div class="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <!-- base radials -->
      <div
        class="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(120,180,255,0.16),transparent_55%),radial-gradient(ellipse_at_bottom,rgba(140,90,255,0.12),transparent_55%)]">
      </div>

      <!-- soft blobs -->
      <div
        class="absolute -top-48 left-1/2 h-[620px] w-[620px] -translate-x-1/2 rounded-full bg-[#5aa2ff]/18 blur-[110px]">
      </div>
      <div class="absolute top-56 -left-56 h-[560px] w-[560px] rounded-full bg-[#8b5dff]/14 blur-[130px]"></div>
      <div class="absolute -bottom-72 right-0 h-[720px] w-[720px] rounded-full bg-[#3dd6ff]/10 blur-[140px]"></div>

      <!-- subtle grid -->
      <div
        class="absolute inset-0 opacity-[0.06] [background-image:linear-gradient(to_right,rgba(255,255,255,0.16)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.16)_1px,transparent_1px)] [background-size:84px_84px]">
      </div>

      <!-- vignette -->
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.82)_85%)]"></div>
    </div>

    <div class="min-h-screen flex flex-col md:flex-row">
      <!-- Mobile Header -->
      <header class="md:hidden flex items-center rounded-3xl justify-between mx-2 my-2 px-4 py-3
               bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.55)]
               z-20 fixed top-0 left-0 right-0">
        <div class="flex items-center gap-2">
          <a href="/" class="flex items-center gap-2">
            <NuxtImg src="/icon.png" class="w-6" />
            <span class="font-bold text-2xl tracking-tight">lunarcntr.xyz</span>
          </a>
        </div>
        <button @click="showMobileMenu = !showMobileMenu" class="focus:outline-none">
          <Icon :name="showMobileMenu ? 'mdi:close' : 'mdi:menu'" size="32px" class="text-white/90" />
        </button>
      </header>

      <!-- Mobile Menu Drawer -->
      <transition name="fade">
        <aside v-if="showMobileMenu" class="fixed inset-0 z-30 bg-black/60 backdrop-blur-sm flex md:hidden">
          <transition name="slide">
            <div class="w-72 max-w-[85vw] bg-white/5 backdrop-blur-xl border-r border-white/10 h-full p-5 flex flex-col gap-4
                     shadow-[20px_0_80px_rgba(0,0,0,0.6)]">
              <!-- Logo -->
              <div class="flex items-center gap-2 mb-6 px-2">
                <NuxtImg src="/icon.png" class="w-6" />
                <span class="font-bold text-2xl tracking-tight">lunarcntr.xyz</span>
              </div>

              <!-- Menu -->
              <nav class="flex flex-col gap-2">
                <button @click="toggleAccount"
                  class="flex items-center w-full px-3 py-2 rounded-2xl transition font-semibold"
                  :class="accountOpen ? 'bg-white/10 border border-white/10' : 'hover:bg-white/5 border border-transparent'">
                  <Icon name="mdi:account-circle" class="mr-2 text-white/80" size="24" />
                  <p class="text-[16px]">Account</p>
                  <Icon :name="accountOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'" class="ml-auto text-white/70" />
                </button>

                <transition name="fade">
                  <div v-if="accountOpen" class="ml-8 flex flex-col gap-1 mt-1">
                    <NuxtLink to="/dashboard" exact-active-class="text-white font-semibold"
                      class="text-[14px] text-white/60 hover:text-white/85 transition" @click="showMobileMenu = false">
                      Overview
                    </NuxtLink>

                    <NuxtLink to="/dashboard/results" active-class="text-white font-semibold"
                      class="text-[14px] text-white/60 hover:text-white/85 transition" @click="showMobileMenu = false">
                      Historical
                    </NuxtLink>

                    <NuxtLink to="/dashboard/settings" active-class="text-white font-semibold"
                      class="text-[14px] text-white/60 hover:text-white/85 transition" @click="showMobileMenu = false">
                      Settings
                    </NuxtLink>
                  </div>
                </transition>

                <NuxtLink v-if="canCustomize" to="/dashboard/customize"
                  exact-active-class="text-white font-bold bg-white/10 border border-white/10"
                  class="flex items-center px-3 py-2 rounded-2xl hover:bg-white/5 transition border border-transparent"
                  @click="showMobileMenu = false">
                  <Icon name="dashicons:admin-customizer" class="mr-2 text-white/80" size="22px" />
                  <p class="text-[16px] font-bold">Customize</p>
                </NuxtLink>

                <NuxtLink to="/dashboard/store"
                  exact-active-class="text-white font-bold bg-white/10 border border-white/10"
                  class="flex items-center px-3 py-2 rounded-2xl hover:bg-white/5 transition border border-transparent"
                  @click="showMobileMenu = false">
                  <Icon name="mdi:cart" class="mr-2 text-white/80" size="22px" />
                  <p class="text-[16px] font-bold">Store</p>
                </NuxtLink>

                <NuxtLink to="/dashboard/checker"
                  exact-active-class="text-white font-bold bg-white/10 border border-white/10"
                  class="flex items-center px-3 py-2 rounded-2xl hover:bg-white/5 transition border border-transparent"
                  @click="showMobileMenu = false">
                  <Icon name="mdi:credit-card" class="mr-2 text-white/80" size="22px" />
                  <p class="text-[16px] font-bold">Checker</p>
                </NuxtLink>

                <NuxtLink v-if="isVip" to="/dashboard/admin"
                  active-class="text-white bg-white/10 font-bold border border-white/10"
                  class="flex items-center px-3 py-2 rounded-2xl hover:bg-white/5 transition border border-transparent"
                  @click="showMobileMenu = false">
                  <Icon name="streamline-plump:diamond-1-solid" class="mr-2 text-white/80" size="22px" />
                  <p class="text-[16px] font-bold">Vip</p>
                </NuxtLink>

                <NuxtLink v-if="user?.reseller" to="/dashboard/reseller"
                  exact-active-class="text-white font-bold bg-white/10 border border-white/10"
                  class="flex items-center px-3 py-2 rounded-2xl hover:bg-white/5 transition border border-transparent"
                  @click="showMobileMenu = false">
                  <Icon name="mdi:account-cash" class="mr-2 text-white/80" size="22px" />
                  <p class="text-[16px] font-bold">Reseller</p>
                </NuxtLink>

                <NuxtLink v-if="isAdmin" to="/dashboard/admin"
                  active-class="text-white bg-white/10 font-bold border border-white/10"
                  class="flex items-center px-3 py-2 rounded-2xl hover:bg-white/5 transition border border-transparent"
                  @click="showMobileMenu = false">
                  <Icon name="material-symbols:admin-panel-settings-rounded" class="mr-2 text-white/80" size="22px" />
                  <p class="text-[16px] font-bold">Admin</p>
                </NuxtLink>
              </nav>

              <!-- Help -->
              <div class="mt-6 flex flex-col gap-2 px-2">
                <a href="https://t.me/lunaroficial" target="_blank" class="rounded-2xl py-2 px-3 flex items-center gap-2 font-semibold justify-center
                         bg-white/10 border border-white/10 hover:bg-white/15 hover:border-white/20 transition">
                  <Icon name="mdi:help-circle-outline" /> Help Center
                </a>
              </div>

              <!-- Actions + Profile -->
              <div class="flex flex-col gap-2 px-2 mt-auto">
                <button v-if="isAdmin" class="rounded-2xl py-2 px-3 flex items-center gap-2 font-semibold justify-center
                         bg-white/10 border border-white/10 hover:bg-white/15 hover:border-white/20 transition"
                  @click="openCreateKeyModal">
                  <Icon name="mdi:key-plus" /> Create Key
                </button>

                <button class="rounded-2xl py-2 px-3 flex items-center gap-2 font-semibold justify-center
                         bg-white/10 border border-white/10 hover:bg-white/15 hover:border-white/20 transition"
                  @click="openModal">
                  <Icon name="mingcute:gift-fill" /> Redeem Key
                </button>

                <div class="flex items-center gap-3 px-3 py-3 rounded-2xl bg-white/5 border border-white/10 relative cursor-pointer
                         hover:bg-white/10 hover:border-white/20 transition" @click="goToProfile">
                  <img :src="user?.photoURL || photoURL" class="rounded-full w-10 h-10 object-cover bg-black/30"
                    alt="Profile" />
                  <div class="flex flex-col min-w-0">
                    <span class="font-bold text-[15px] leading-tight truncate max-w-[140px]">
                      {{ user?.nickname || 'User' }}
                    </span>
                    <span class="text-xs text-white/55 font-medium">
                      Balance: <span class="font-semibold text-white">R$ {{ balance.toFixed(2) }}</span>
                    </span>
                  </div>

                  <button @click.stop="showProfileMenu = !showProfileMenu"
                    class="ml-auto flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/10 transition">
                    <Icon name="mdi:dots-horizontal" size="22" class="text-white/70" />
                  </button>

                  <div v-if="showProfileMenu" class="absolute bottom-14 left-4 right-4 z-50 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl
                           shadow-[0_18px_60px_rgba(0,0,0,0.55)] p-4 flex flex-col gap-2"
                    @click.away="showProfileMenu = false">
                    <div class="font-bold text-white text-[18px] mb-1">Other Links</div>
                    <div class="text-[13px] text-white/55 mb-2">Navigate quickly through our system</div>

                    <NuxtLink to="/"
                      class="w-full py-2 rounded-xl bg-white/10 border border-white/10 text-center font-semibold hover:bg-white/15 hover:border-white/20 transition">
                      Home
                    </NuxtLink>

                    <a href="https://t.me/lunaroficial" target="_blank"
                      class="w-full py-2 rounded-xl bg-[#3390ec]/20 border border-[#3390ec]/40 text-white text-center font-semibold flex items-center justify-center gap-2 hover:brightness-110 transition">
                      <Icon name="mdi:telegram" /> Telegram Group
                    </a>

                    <NuxtLink to="/dashboard/settings"
                      class="w-full py-2 rounded-xl bg-[#7aa7ff]/15 border border-[#7aa7ff]/35 text-white text-center font-semibold flex items-center justify-center gap-2 hover:brightness-110 transition">
                      <Icon name="mdi:cog" /> Account Settings
                    </NuxtLink>

                    <button @click="logout"
                      class="w-full py-2 rounded-xl bg-rose-500/15 border border-rose-500/30 text-white text-center font-semibold flex items-center justify-center gap-2 hover:bg-rose-500/20 hover:border-rose-500/40 transition">
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </transition>

          <div class="flex-1" @click="showMobileMenu = false"></div>
        </aside>
      </transition>

      <!-- Desktop Sidebar -->
      <aside class="hidden md:flex w-72 min-h-screen flex-col justify-between py-6 px-4
               bg-white/5 backdrop-blur-xl rounded-r-3xl border-r border-white/10
               shadow-[0_0_80px_rgba(0,0,0,0.45)]">
        <div>
          <!-- Logo -->
          <div class="flex items-center gap-2 mb-8 px-2">
            <a href="/" class="flex items-center gap-2">
              <NuxtImg src="/icon.png" class="w-8" />
              <span class="font-bold text-2xl tracking-tight">lunarcntr.xyz</span>
            </a>
          </div>

          <!-- Menu -->
          <nav class="flex flex-col gap-2">
            <!-- Account Dropdown -->
            <div>
              <button @click="toggleAccount"
                class="flex items-center w-full px-3 py-2 rounded-2xl transition font-semibold"
                :class="accountOpen ? 'bg-white/10 border border-white/10' : 'hover:bg-white/5 border border-transparent'">
                <Icon name="mdi:account-circle" class="mr-2 text-white/80" size="24" />
                <p class="text-[16px]">Account</p>
                <Icon :name="accountOpen ? 'mdi:chevron-up' : 'mdi:chevron-down'" class="ml-auto text-white/70" />
              </button>

              <transition name="fade">
                <div v-if="accountOpen" class="ml-12 flex flex-col gap-1 mt-1">
                  <NuxtLink to="/dashboard" exact-active-class="text-white font-semibold"
                    class="text-[14px] text-white/60 hover:text-white/85 transition">
                    Overview
                  </NuxtLink>
                  <NuxtLink to="/dashboard/results" active-class="text-white font-semibold"
                    class="text-[14px] text-white/60 hover:text-white/85 transition">
                    Historical
                  </NuxtLink>
                  <NuxtLink to="/dashboard/settings" active-class="text-white font-semibold"
                    class="text-[14px] text-white/60 hover:text-white/85 transition">
                    Settings
                  </NuxtLink>
                </div>
              </transition>
            </div>

            <!-- Customize (corrigido) -->
            <NuxtLink v-if="canCustomize" to="/dashboard/customize"
              exact-active-class="text-white font-bold bg-white/10 border border-white/10"
              class="flex items-center px-3 py-2 rounded-2xl hover:bg-white/5 transition border border-transparent">
              <Icon name="dashicons:admin-customizer" class="mr-2 text-white/80" size="22px" />
              <p class="text-[16px] font-bold">Customize</p>
            </NuxtLink>

            <NuxtLink to="/dashboard/store" exact-active-class="text-white font-bold bg-white/10 border border-white/10"
              class="flex items-center px-3 py-2 rounded-2xl hover:bg-white/5 transition border border-transparent">
              <Icon name="mdi:cart" class="mr-2 text-white/80" size="22px" />
              <p class="text-[16px] font-bold">Store</p>
            </NuxtLink>

            <NuxtLink to="/dashboard/checker"
              exact-active-class="text-white font-bold bg-white/10 border border-white/10"
              class="flex items-center px-3 py-2 rounded-2xl hover:bg-white/5 transition border border-transparent">
              <Icon name="mdi:credit-card" class="mr-2 text-white/80" size="22px" />
              <p class="text-[16px] font-bold">Checker</p>
            </NuxtLink>

            <NuxtLink to="/dashboard/vip" v-if="isVip"
              exact-active-class="text-white font-bold bg-white/10 border border-white/10"
              class="flex items-center px-3 py-2 rounded-2xl hover:bg-white/5 transition border border-transparent">
              <Icon name="streamline-plump:diamond-1-solid" class="mr-2 text-white/80" size="22px" />
              <p class="text-[16px] font-bold">Vip</p>
            </NuxtLink>

            <NuxtLink to="/dashboard/reseller"
              exact-active-class="text-white font-bold bg-white/10 border border-white/10" v-if="user?.reseller"
              class="flex items-center px-3 py-2 rounded-2xl hover:bg-white/5 transition border border-transparent">
              <Icon name="mdi:account-cash" class="mr-2 text-white/80" size="22px" />
              <p class="text-[16px] font-bold">Reseller</p>
            </NuxtLink>

            <NuxtLink v-if="isAdmin" to="/dashboard/admin"
              active-class="text-white bg-white/10 font-bold border border-white/10"
              class="flex items-center px-3 py-2 rounded-2xl hover:bg-white/5 transition border border-transparent">
              <Icon name="material-symbols:admin-panel-settings-rounded" class="mr-2 text-white/80" size="22px" />
              <p class="text-[16px] font-bold">Admin</p>
            </NuxtLink>

            <NuxtLink v-if="isAdmin" to="/dashboard/keys"
              active-class="text-white bg-white/10 font-bold border border-white/10"
              class="flex items-center px-3 py-2 rounded-2xl hover:bg-white/5 transition border border-transparent">
              <Icon name="ic:baseline-vpn-key" class="mr-2 text-white/80" size="22px" />
              <p class="text-[16px] font-bold">Keys</p>
            </NuxtLink>
          </nav>

          <!-- Help -->
          <div class="mt-8 flex flex-col gap-2 px-2">
            <a href="https://t.me/lunaroficial" target="_blank"
              class="rounded-2xl py-2 px-3 flex items-center gap-2 font-semibold justify-center
                     bg-[#7aa7ff]/15 border border-[#7aa7ff]/30 hover:bg-[#7aa7ff]/20 hover:border-[#7aa7ff]/40 transition">
              <Icon name="mdi:help-circle-outline" /> Help Center
            </a>
          </div>
        </div>

        <!-- Actions + Profile -->
        <div class="flex flex-col gap-2 px-2">
          <button v-if="isAdmin" class="rounded-2xl py-2 px-3 flex items-center gap-2 font-semibold justify-center
                   bg-white/10 border border-white/10 hover:bg-white/15 hover:border-white/20 transition"
            @click="openCreateKeyModal">
            <Icon name="mdi:key-plus" /> Create Key
          </button>
          <button class="rounded-2xl py-2 px-3 flex items-center gap-2 font-semibold justify-center
                   bg-white/10 border border-white/10 hover:bg-white/15 hover:border-white/20 transition"
            @click="openModal">
            <Icon name="mingcute:gift-fill" /> Redeem Key
          </button>

          <div class="flex items-center gap-3 px-2 py-3 rounded-2xl bg-white/5 border border-white/10 relative cursor-pointer
                   hover:bg-white/10 hover:border-white/20 transition" @click="goToProfile">
            <img :src="user?.photoURL || photoURL" class="rounded-full w-10 h-10 object-cover bg-black/30"
              alt="Profile" />
            <div class="flex flex-col min-w-0">
              <span class="font-bold text-[15px] leading-tight truncate max-w-[140px]">
                {{ user?.nickname || 'User' }}
              </span>
              <span class="text-xs text-white/55 font-medium">
                Balance: <span class="font-semibold text-white">R$ {{ balance.toFixed(2) }}</span>
              </span>
            </div>

            <button @click.stop="showProfileMenu = !showProfileMenu"
              class="ml-auto flex items-center justify-center w-8 h-8 rounded-full hover:bg-white/10 transition">
              <Icon name="mdi:dots-horizontal" size="22" class="text-white/70" />
            </button>

            <div v-if="showProfileMenu" class="absolute bottom-14 left-4 right-4 z-50 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl
                     shadow-[0_18px_60px_rgba(0,0,0,0.55)] p-4 flex flex-col gap-2"
              @click.away="showProfileMenu = false">
              <div class="font-bold text-white text-[18px] mb-1">Other Links</div>
              <div class="text-[13px] text-white/55 mb-2">Navigate quickly through our system</div>

              <NuxtLink to="/"
                class="w-full py-2 rounded-xl bg-white/10 border border-white/10 text-center font-semibold hover:bg-white/15 hover:border-white/20 transition">
                Home
              </NuxtLink>

              <a href="https://t.me/lunaroficial" target="_blank"
                class="w-full py-2 rounded-xl bg-[#3390ec]/20 border border-[#3390ec]/40 text-white text-center font-semibold flex items-center justify-center gap-2 hover:brightness-110 transition">
                <Icon name="mdi:telegram" /> Telegram Group
              </a>

              <NuxtLink to="/dashboard/settings"
                class="w-full py-2 rounded-xl bg-[#7aa7ff]/15 border border-[#7aa7ff]/35 text-white text-center font-semibold flex items-center justify-center gap-2 hover:brightness-110 transition">
                <Icon name="mdi:cog" /> Account Settings
              </NuxtLink>

              <button @click="logout"
                class="w-full py-2 rounded-xl bg-rose-500/15 border border-rose-500/30 text-white text-center font-semibold flex items-center justify-center gap-2 hover:bg-rose-500/20 hover:border-rose-500/40 transition">
                Logout
              </button>
            </div>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main class="flex-1 min-h-screen font-satoshi pt-16 md:pt-0">
        <!-- Mantém o fundo “do layout” (não pinta sólido aqui) -->
        <div class="px-4 sm:px-6 lg:px-10 py-6">
          <NuxtPage />
        </div>
      </main>

      <!-- Modal de Resgatar Key -->
      <transition name="modal-fade">
        <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center font-satoshi px-4">
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

          <transition name="modal-zoom">
            <div class="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl
                     p-8 shadow-[0_24px_90px_rgba(0,0,0,0.70)] overflow-hidden">
              <div
                class="pointer-events-none absolute -inset-1 opacity-60 bg-[radial-gradient(circle_at_top,rgba(122,167,255,0.25),transparent_55%)]">
              </div>

              <button @click="closeModal"
                class="absolute top-4 right-4 text-white/60 hover:text-white text-2xl transition">
                <Icon name="mdi:close" />
              </button>

              <div class="relative flex flex-col gap-6">
                <div class="flex flex-col items-center gap-2">
                  <Icon name="mingcute:gift-fill" size="46" class="text-[#7aa7ff]" />
                  <h2 class="text-2xl font-black text-white">Redeem Key</h2>
                  <p class="text-white/60 text-sm text-center">Enter your key below to add funds to your account.</p>
                </div>

                <input v-model="keyInput" placeholder="Enter your key here" class="rounded-2xl px-4 py-3 bg-black/30 border border-white/10 text-white outline-none
                         focus:border-white/20 focus:ring-2 focus:ring-[#7aa7ff]/30 transition" />

                <PrimaryB @click="redeemKey" :disabled="loading" class="w-full flex items-center justify-center gap-2">
                  <Icon name="mdi:check-bold" /> {{ loading ? 'Redeeming...' : 'Confirm' }}
                </PrimaryB>

                <div v-if="redeemMessage" class="text-center text-sm flex items-center justify-center gap-2"
                  :class="redeemSuccess ? 'text-emerald-400' : 'text-rose-400'">
                  <Icon :name="redeemSuccess ? 'mdi:check-circle' : 'mdi:alert-circle'" />
                  {{ redeemMessage }}
                </div>
              </div>
            </div>
          </transition>
        </div>
      </transition>

      <!-- Modal de Criar Key (admin) -->
      <transition name="modal-fade">
        <div v-if="showCreateKeyModal" class="fixed inset-0 z-50 flex items-center justify-center font-satoshi px-4">
          <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

          <transition name="modal-zoom">
            <div class="relative w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl
                     p-8 shadow-[0_24px_90px_rgba(0,0,0,0.70)] overflow-hidden">
              <div
                class="pointer-events-none absolute -inset-1 opacity-60 bg-[radial-gradient(circle_at_top,rgba(122,167,255,0.22),transparent_55%)]">
              </div>

              <button @click="closeCreateKeyModal"
                class="absolute top-4 right-4 text-white/60 hover:text-white text-2xl transition">
                <Icon name="mdi:close" />
              </button>

              <div class="relative flex flex-col gap-6">
                <div class="flex flex-col items-center gap-2">
                  <Icon name="mdi:key-plus" size="46" class="text-[#7aa7ff]" />
                  <h2 class="text-2xl font-black text-white">Create Key</h2>
                  <p class="text-white/60 text-sm text-center">
                    Set the value in BRL. The code will be generated automatically.
                  </p>
                </div>

                <input v-model="newKeyValue" min="1" placeholder="Value (R$)" class="rounded-2xl px-4 py-3 bg-black/30 border border-white/10 text-white outline-none
                         focus:border-white/20 focus:ring-2 focus:ring-[#7aa7ff]/30 transition" />

                <PrimaryB @click="createKey" :disabled="createKeyLoading"
                  class="w-full flex items-center justify-center gap-2">
                  <Icon name="mdi:check-bold" /> {{ createKeyLoading ? 'Creating...' : 'Create Key' }}
                </PrimaryB>

                <div v-if="createKeyMessage" class="text-center text-sm flex items-center justify-center gap-2"
                  :class="createKeySuccess ? 'text-emerald-400' : 'text-rose-400'">
                  <Icon :name="createKeySuccess ? 'mdi:check-circle' : 'mdi:alert-circle'" />
                  {{ createKeyMessage }}
                </div>
              </div>
            </div>
          </transition>
        </div>
      </transition>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { auth, db } from '~/firebase'
import { doc, getDoc, updateDoc, deleteDoc, setDoc, serverTimestamp, getDocs, collection, query, where } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import QRCode from 'qrcode'

const showProfileMenu = ref(false)
const router = useRouter()

function logout() {
  signOut(auth).then(() => {
    router.push('/login')
  })
  showProfileMenu.value = false
}

const showMobileMenu = ref(false)

const accountOpen = ref(true)
function toggleAccount() {
  accountOpen.value = !accountOpen.value
}

// Dados do usuário
const user = ref(null)
const balance = ref(0)
const livesUsed = ref(0)
const cardsBought = ref(0)
const photoURL = ref('https://i.imgur.com/qqG1ZOD.jpeg') // Placeholder
const isAdmin = ref(false)
const isVip = ref(false)
const copied = ref(false)
const accountStatus = ref('Common') // Premium/Common/Blocked

// ✅ condição correta para Customize
const canCustomize = computed(() => ['Premium', 'Administrator', 'Reseller'].includes(accountStatus.value))

const checksMonth = ref(0)
const avgSpentWeek = ref(0)
const lastLogin = ref('')

const notices = ref(['New profile system!'])

function goToProfile() {
  if (user.value?.nickname) {
    router.push(`/profile/${user.value.nickname}`)
  }
}

onMounted(async () => {
  auth.onAuthStateChanged(async u => {
    if (u) {
      user.value = u
      photoURL.value = u.photoURL || photoURL.value
      let location = {}
      try {
        const res = await fetch('https://ipapi.co/json/')
        location = await res.json()
      } catch (e) {
        location = { error: true }
      }

      await updateDoc(doc(db, 'users', u.uid), {
        lastLogin: serverTimestamp(),
        lastLocation: {
          ip: location.ip ?? null,
          city: location.city ?? null,
          country: location.country_name ?? null
        }
      })

      const userDoc = await getDoc(doc(db, 'users', u.uid))
      if (userDoc.exists()) {
        const data = userDoc.data()
        balance.value = data.balance ?? 0
        photoURL.value = data.photoURL ?? photoURL.value
        livesUsed.value = data.livesUsed ?? 0
        cardsBought.value = data.cardsBought ?? 0
        isAdmin.value = !!data.admin
        isVip.value = !!data.vipAccess

        // mantém reseller/nickname no user ref
        user.value = { ...user.value, reseller: !!data.reseller, nickname: data.nickname }

        checksMonth.value = data.checksMonth ?? 0
        avgSpentWeek.value = data.avgSpentWeek ?? 0

        if (data.lastLogin && typeof data.lastLogin.toDate === 'function') {
          const date = data.lastLogin.toDate()
          lastLogin.value = date.toLocaleString('pt-BR')
        } else {
          lastLogin.value = data.lastLogin ?? ''
        }

        accountStatus.value = data.status ?? 'Common'
        if (!data.nickname) {
          showNicknameModal.value = true
        }
      }
    }
  })
})

// Modal e lógica de resgate de key
const showModal = ref(false)
const keyInput = ref('')
const loading = ref(false)
const redeemMessage = ref('')
const redeemSuccess = ref(false)

// Modal Recharge
const showRechargeModal = ref(false)
const amounts = [5, 10, 15, 45]
const creditsMap = { 5: 20, 10: 50, 15: 100, 45: 1200 }
const selectedCurrency = ref('BTC')
const selectedAmount = ref(5)
const invoiceData = ref(null)
const qrImage = ref('')
const isCreatingInvoice = ref(false)
let pollTimer = null

// Modal de criar key
const showCreateKeyModal = ref(false)
const newKeyValue = ref('')
const createKeyMessage = ref('')
const createKeyLoading = ref(false)
const createKeySuccess = ref(false)

// Modal de nickname
const nicknameInput = ref('')
const nicknameError = ref('')
const showNicknameModal = ref(false)

function generateKeyCode() {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let code = ''
  for (let i = 0; i < 16; i++) code += chars.charAt(Math.floor(Math.random() * chars.length))
  return `LUNAR-${code}`
}

function openModal() {
  showModal.value = true
  keyInput.value = ''
  redeemMessage.value = ''
  redeemSuccess.value = false
}
function closeModal() {
  showModal.value = false
}

function openRechargeModal() {
  showRechargeModal.value = true
  selectedCurrency.value = 'BTC'
  selectedAmount.value = 5
  invoiceData.value = null
  qrImage.value = ''
  isCreatingInvoice.value = false
}
function closeRechargeModal() {
  showRechargeModal.value = false
  invoiceData.value = null
  qrImage.value = ''
  if (pollTimer) {
    clearInterval(pollTimer)
    pollTimer = null
  }
}

async function createInvoice() {
  if (!user.value) {
    alert('Faça login primeiro.')
    return
  }
  isCreatingInvoice.value = true
  invoiceData.value = null
  qrImage.value = ''

  try {
    const body = {
      pay_currency: selectedCurrency.value,
      amount_usd: selectedAmount.value,
      uid: user.value.uid
    }

    const res = await fetch('/api/payments/create-invoice', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    })

    if (!res.ok) throw new Error('Failed to create invoice')

    const data = await res.json()
    invoiceData.value = data

    const toEncode = data.pay_address || data.invoice_url || data.payment_url || ''
    if (toEncode) qrImage.value = await QRCode.toDataURL(toEncode)

    if (pollTimer) clearInterval(pollTimer)
    pollTimer = setInterval(async () => {
      try {
        const st = await fetch('/api/payments/invoice-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ invoiceId: invoiceData.value.id })
        })
        if (!st.ok) throw new Error('status check failed')
        const js = await st.json()
        invoiceData.value = { ...invoiceData.value, ...js }

        if (js.status && (js.status === 'finished' || js.status === 'confirmed' || js.status === 'paid')) {
          clearInterval(pollTimer)
          pollTimer = null
          setTimeout(() => closeRechargeModal(), 1200)
        }
      } catch (e) {
        console.error('poll error', e)
      }
    }, 8000)
  } catch (e) {
    console.error(e)
    alert('Erro ao criar invoice: ' + (e.message || e))
  }

  isCreatingInvoice.value = false
}

function openCreateKeyModal() {
  showCreateKeyModal.value = true
  newKeyValue.value = ''
  createKeyMessage.value = ''
  createKeySuccess.value = false
}
function closeCreateKeyModal() {
  showCreateKeyModal.value = false
}

async function redeemKey() {
  redeemMessage.value = ''
  redeemSuccess.value = false
  loading.value = true

  const key = keyInput.value.trim()
  if (!key) {
    redeemMessage.value = 'Digite uma key válida.'
    loading.value = false
    return
  }

  try {
    const keyRef = doc(db, 'keys', key)
    const keySnap = await getDoc(keyRef)
    if (!keySnap.exists()) {
      redeemMessage.value = 'Key inválida ou já utilizada.'
      loading.value = false
      return
    }

    const value = keySnap.data().value ?? 0
    const userRef = doc(db, 'users', user.value.uid)
    const novoSaldo = balance.value + value

    const userDoc = await getDoc(userRef)
    const isAdminUser = userDoc.exists() && userDoc.data().admin

    await updateDoc(userRef, {
      balance: novoSaldo,
      status: isAdminUser ? 'Administrator' : (novoSaldo > 0 ? 'Premium' : 'Common')
    })

    await setDoc(doc(db, 'usedKeys', key), {
      keyId: key,
      value: value,
      createdBy: keySnap.data().createdBy ?? null,
      createdByEmail: keySnap.data().createdByEmail ?? null,
      createdAt: keySnap.data().createdAt ?? null,
      usedBy: user.value.uid,
      usedByEmail: user.value.email,
      usedAt: serverTimestamp()
    })

    await deleteDoc(keyRef)

    balance.value = novoSaldo
    accountStatus.value = isAdminUser ? 'Administrator' : (novoSaldo > 0 ? 'Premium' : 'Common')
    redeemMessage.value = `Key resgatada! Valor: R$ ${value.toFixed(2)}`
    redeemSuccess.value = true
    keyInput.value = ''
  } catch (e) {
    redeemMessage.value = 'Erro ao resgatar key: ' + (e.message || e.code || e)
  }

  loading.value = false
}

async function createKey() {
  createKeyMessage.value = ''
  createKeySuccess.value = false
  createKeyLoading.value = true

  const value = Number(newKeyValue.value)
  if (!value || value <= 0) {
    createKeyMessage.value = 'Preencha um valor válido.'
    createKeyLoading.value = false
    return
  }

  try {
    const keyId = generateKeyCode()
    await setDoc(doc(db, 'keys', keyId), {
      value,
      createdBy: user.value.uid,
      createdByEmail: user.value.email,
      createdAt: serverTimestamp(),
      usedBy: null,
      usedByEmail: null,
      usedAt: null
    })

    await navigator.clipboard.writeText(keyId)
    createKeyMessage.value = `Key criada com sucesso: ${keyId}`
    createKeySuccess.value = true
    newKeyValue.value = ''
  } catch (e) {
    createKeyMessage.value = 'Erro ao criar key: ' + (e.message || e.code || e)
  }

  createKeyLoading.value = false
}

async function saveNickname() {
  nicknameError.value = ''
  if (!nicknameInput.value || nicknameInput.value.length < 3) {
    nicknameError.value = 'O nickname deve ter pelo menos 3 caracteres.'
    return
  }
  try {
    const q = query(collection(db, 'users'), where('nickname', '==', nicknameInput.value))
    const snap = await getDocs(q)
    let exists = false
    snap.forEach(docSnap => {
      if (docSnap.id !== user.value.uid) exists = true
    })
    if (exists) {
      nicknameError.value = 'Este nickname já está em uso.'
      return
    }
    await updateDoc(doc(db, 'users', user.value.uid), { nickname: nicknameInput.value })
    showNicknameModal.value = false
  } catch (e) {
    nicknameError.value = 'Erro ao salvar nickname.'
  }
}

function copyEmail() {
  if (user.value?.email) {
    navigator.clipboard.writeText(user.value.email)
    copied.value = true
    setTimeout(() => (copied.value = false), 1200)
  }
}
</script>

<style scoped>
/* drawer + dropdown fade */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  max-height: 0;
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  max-height: 600px;
}

/* slide drawer */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.22s ease, opacity 0.22s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-12px);
  opacity: 0;
}

/* modal transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.22s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-zoom-enter-active,
.modal-zoom-leave-active {
  transition: all 0.26s cubic-bezier(.4, 2, .6, 1);
}

.modal-zoom-enter-from,
.modal-zoom-leave-to {
  opacity: 0;
  transform: scale(0.92);
}
</style>
