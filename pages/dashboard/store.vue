<template>
  <div class="w-full mx-auto pt-20 md:pt-8 px-4 sm:px-6 lg:px-10 font-satoshi">
    <!-- Header -->
           <div class="flex flex-col gap-2 mb-8">
        <div class="inline-flex items-center gap-2 w-full rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs text-white/70 backdrop-blur-xl">
          <span class="h-1.5 w-1.5 rounded-full bg-[#7aa7ff] shadow-[0_0_18px_rgba(122,167,255,0.9)]"></span>
          Dashboard • Store
        </div>
      </div>
    <div class="mb-5 md:mb-7">
      <div class="flex items-center gap-3">
        <span
          class="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl
                 flex items-center justify-center shadow-[0_12px_40px_rgba(0,0,0,0.55)]"
        >
          <Icon name="solar:cart-bold" size="36px" class="text-[#7aa7ff]" />
        </span>
        <div>
          <h2 class="text-xl md:text-3xl font-black tracking-tight text-white">Store</h2>
          <p class="text-sm text-white/55">
            Here you can buy products with your balance.
          </p>
        </div>
      </div>
    </div>

    <!-- Search + (opcional) balance -->
    <div
      class="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl
             shadow-[0_18px_70px_rgba(0,0,0,0.55)] p-4 sm:p-5 mb-5"
    >
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div class="relative flex items-center w-full md:max-w-md">
          <span class="absolute left-3 pt-2 top-1/2 -translate-y-1/2 text-white/55">
            <Icon name="mdi:magnify" size="20" />
          </span>
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Search product name..."
            class="w-full rounded-2xl pl-10 pr-4 py-3 bg-black/25 border border-white/10 text-white
                   placeholder-white/35 outline-none
                   focus:border-white/20 focus:ring-2 focus:ring-[#7aa7ff]/25 transition"
          />
        </div>

        <div class="flex items-center gap-3">
          <div
            class="px-4 py-3 rounded-2xl bg-black/25 border border-white/10 text-sm text-white/75"
            title="Your current balance"
          >
            <span class="text-white/50">Balance:</span>
            <span class="font-bold text-white ml-1">R$ {{ Number(userBalance || 0).toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center items-center w-full py-16">
      <div class="animate-spin rounded-full h-12 w-12 border-l-2 border-white/60 border-r-2 border-white/10"></div>
    </div>

    <!-- Empty -->
    <div v-else-if="filteredProducts.length === 0" class="text-white/55 text-center py-10">
      No products available.
    </div>

    <!-- Products -->
    <div v-else>
      <div
        class="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl
               shadow-[0_18px_70px_rgba(0,0,0,0.55)] p-4 sm:p-6 overflow-hidden"
      >
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
        >
          <!-- Product card -->
          <div
            v-for="product in filteredProducts"
            :key="product.id"
            class="rounded-2xl border border-white/10 bg-black/20 hover:bg-white/5 hover:border-white/15 transition
                   shadow-[0_10px_30px_rgba(0,0,0,0.35)] p-3 flex flex-col min-w-0"
          >
            <NuxtImg
              src="/images/download.png"
              alt="Product Icon"
              class="rounded-2xl w-full h-28 object-cover mb-3 border border-white/10 bg-black/30"
            />

            <div class="flex items-start justify-between gap-2 min-w-0">
              <h3 class="text-sm font-black text-white truncate">
                🛒 {{ product.id }}
              </h3>
              <span class="text-xs text-white/60 whitespace-nowrap">
                R$ {{ (product.data.value ?? 0).toFixed ? product.data.value.toFixed(2) : (product.data.value ?? 0) }}
              </span>
            </div>

            <div class="mt-1 text-xs text-white/55">
              Stock:
              <span class="font-semibold text-white/80">
                {{ getStockCount(product) }}
              </span>
            </div>

            <div class="mt-3 flex items-center gap-2">
              <TertiaryB
                @click="buyProduct(product.id)"
                class="bg-emerald-500/10 border-emerald-500/20 hover:border-emerald-500/30 text-white flex-1"
                :disabled="getStockCount(product) === 0"
                :class="{ 'opacity-50 cursor-not-allowed': getStockCount(product) === 0 }"
              >
                Buy
              </TertiaryB>

              <button
                class="w-12 h-11 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition
                       flex items-center justify-center"
                @click="openInfoModal(product)"
                title="Info"
              >
                <Icon name="material-symbols:info-rounded" size="22px" class="text-white/80" />
              </button>

              <button
                v-if="isAdmin"
                class="w-12 h-11 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition
                       flex items-center justify-center"
                @click="openEditModal(product)"
                title="Edit"
              >
                <Icon name="material-symbols:edit-outline-rounded" size="22px" class="text-white/80" />
              </button>
            </div>
          </div>

          <!-- Create product card -->
          <button
            v-if="isAdmin"
            class="rounded-2xl border border-dashed border-white/20 bg-black/20 hover:bg-white/5 hover:border-white/30 transition
                   shadow-[0_10px_30px_rgba(0,0,0,0.35)] p-3 flex flex-col items-center justify-center min-h-[260px]"
            @click="showCreateModal = true"
          >
            <Icon name="material-symbols:add-box" size="44" class="text-[#7aa7ff] mb-2" />
            <span class="text-base font-black text-white">New Product</span>
            <span class="text-xs text-white/55 mt-1">Click to add</span>
          </button>
        </div>
      </div>
    </div>

    <!-- EDIT MODAL -->
    <transition name="modal-fade">
      <div v-if="showEditModal" class="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showEditModal = false"></div>

        <transition name="modal-zoom">
          <div
            class="relative w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl
                   p-6 sm:p-7 shadow-[0_24px_90px_rgba(0,0,0,0.70)] overflow-hidden"
          >
            <div class="pointer-events-none absolute -inset-1 opacity-60 bg-[radial-gradient(circle_at_top,rgba(122,167,255,0.20),transparent_55%)]"></div>

            <button
              @click="showEditModal = false"
              class="absolute top-4 right-4 w-10 h-10 rounded-full hover:bg-white/10 transition flex items-center justify-center"
            >
              <Icon name="mdi:close" size="22" class="text-white/70" />
            </button>

            <div class="relative flex flex-col gap-5">
              <div class="flex items-center gap-3">
                <span class="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Icon name="material-symbols:edit-outline-rounded" size="24" class="text-[#7aa7ff]" />
                </span>
                <div>
                  <h2 class="text-xl font-black text-white">Edit Product</h2>
                  <p class="text-sm text-white/55">Change price, description and inventory.</p>
                </div>
              </div>

              <div class="grid grid-cols-1 gap-3">
                <div>
                  <label class="text-xs text-white/60">Price</label>
                  <input
                    v-model.number="selectedProduct.data.value"
                    type="number"
                    min="0"
                    class="mt-1 w-full rounded-2xl px-4 py-3 bg-black/25 border border-white/10 text-white outline-none
                           focus:border-white/20 focus:ring-2 focus:ring-[#7aa7ff]/25 transition"
                  />
                </div>

                <div>
                  <label class="text-xs text-white/60">Description</label>
                  <input
                    v-model="editDescription"
                    class="mt-1 w-full rounded-2xl px-4 py-3 bg-black/25 border border-white/10 text-white outline-none
                           focus:border-white/20 focus:ring-2 focus:ring-[#7aa7ff]/25 transition"
                    placeholder="No description available"
                  />
                </div>

                <div>
                  <label class="text-xs text-white/60">Add stock (one per line)</label>
                  <textarea
                    v-model="newStockTxt"
                    rows="3"
                    class="mt-1 w-full rounded-2xl px-4 py-3 bg-black/25 border border-white/10 text-white outline-none
                           focus:border-white/20 focus:ring-2 focus:ring-[#7aa7ff]/25 transition"
                    placeholder="Each line is a product"
                  ></textarea>
                </div>

                <!-- Upload TXT -->
                <div
                  class="rounded-2xl border border-dashed border-white/20 bg-black/20 p-4 text-center
                         hover:bg-white/5 hover:border-white/30 transition cursor-pointer"
                  @dragover.prevent="dragActive = true"
                  @dragleave.prevent="dragActive = false"
                  @drop.prevent="handleDrop"
                  :class="{ 'border-white/40 bg-white/5': dragActive }"
                >
                  <span v-if="!uploadedTxtFileName" class="block text-white/55 mb-2">
                    Drag a .txt file here or click to select
                  </span>

                  <input type="file" accept=".txt" @change="handleTxtUpload" class="hidden" ref="fileInput" />

                  <button
                    v-if="!uploadedTxtFileName"
                    type="button"
                    class="px-3 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition text-xs font-bold text-white"
                    @click="$refs.fileInput.click()"
                  >
                    Select .txt file
                  </button>

                  <div v-if="uploadedTxtFileName" class="mt-2 flex flex-col items-center gap-2 text-xs text-white/80">
                    <span class="font-bold">{{ uploadedTxtFileName }} ({{ uploadedTxtLines }} lines)</span>
                    <button
                      type="button"
                      class="px-3 py-2 rounded-xl bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/15 hover:border-rose-500/30 transition text-xs font-bold text-white"
                      @click="cancelTxtUpload"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>

              <div class="flex gap-3">
                <button
                  @click="saveProductEdit"
                  class="flex-1 rounded-2xl px-4 py-3 font-bold text-sm text-white
                         bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/15 hover:border-emerald-500/30 transition"
                >
                  Save
                </button>
                <button
                  @click="showEditModal = false"
                  class="flex-1 rounded-2xl px-4 py-3 font-bold text-sm text-white
                         bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/15 hover:border-rose-500/30 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>

    <!-- CREATE MODAL -->
    <transition name="modal-fade">
      <div v-if="showCreateModal" class="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showCreateModal = false"></div>

        <transition name="modal-zoom">
          <div
            class="relative w-full max-w-lg rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl
                   p-6 sm:p-7 shadow-[0_24px_90px_rgba(0,0,0,0.70)] overflow-hidden"
          >
            <div class="pointer-events-none absolute -inset-1 opacity-60 bg-[radial-gradient(circle_at_top,rgba(140,90,255,0.16),transparent_55%)]"></div>

            <button
              @click="showCreateModal = false"
              class="absolute top-4 right-4 w-10 h-10 rounded-full hover:bg-white/10 transition flex items-center justify-center"
            >
              <Icon name="mdi:close" size="22" class="text-white/70" />
            </button>

            <div class="relative flex flex-col gap-5">
              <div class="flex items-center gap-3">
                <span class="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Icon name="material-symbols:add-box" size="24" class="text-[#7aa7ff]" />
                </span>
                <div>
                  <h2 class="text-xl font-black text-white">Create Product</h2>
                  <p class="text-sm text-white/55">Create a new product and set the price.</p>
                </div>
              </div>

              <div class="grid grid-cols-1 gap-3">
                <div>
                  <label class="text-xs text-white/60">Product Name</label>
                  <input
                    v-model="newProductId"
                    class="mt-1 w-full rounded-2xl px-4 py-3 bg-black/25 border border-white/10 text-white outline-none
                           focus:border-white/20 focus:ring-2 focus:ring-[#7aa7ff]/25 transition"
                  />
                </div>

                <div>
                  <label class="text-xs text-white/60">Price</label>
                  <input
                    v-model.number="newProductValue"
                    type="number"
                    min="0"
                    class="mt-1 w-full rounded-2xl px-4 py-3 bg-black/25 border border-white/10 text-white outline-none
                           focus:border-white/20 focus:ring-2 focus:ring-[#7aa7ff]/25 transition"
                  />
                </div>
              </div>

              <div class="flex gap-3">
                <button
                  @click="createProduct"
                  class="flex-1 rounded-2xl px-4 py-3 font-bold text-sm text-white
                         bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/15 hover:border-emerald-500/30 transition"
                >
                  Create
                </button>
                <button
                  @click="showCreateModal = false"
                  class="flex-1 rounded-2xl px-4 py-3 font-bold text-sm text-white
                         bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/15 hover:border-rose-500/30 transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>

    <!-- BOUGHT MODAL -->
    <transition name="modal-fade">
      <div v-if="showBoughtModal" class="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showBoughtModal = false"></div>

        <transition name="modal-zoom">
          <div
            class="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl
                   p-6 sm:p-7 shadow-[0_24px_90px_rgba(0,0,0,0.70)] overflow-hidden"
          >
            <div class="pointer-events-none absolute -inset-1 opacity-60 bg-[radial-gradient(circle_at_top,rgba(61,214,255,0.14),transparent_55%)]"></div>

            <button
              @click="showBoughtModal = false"
              class="absolute top-4 right-4 w-10 h-10 rounded-full hover:bg-white/10 transition flex items-center justify-center"
            >
              <Icon name="mdi:close" size="22" class="text-white/70" />
            </button>

            <div class="relative flex flex-col gap-5">
              <div class="flex items-center gap-3">
                <span class="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Icon name="material-symbols:check-circle-rounded" size="24" class="text-emerald-300" />
                </span>
                <div>
                  <h2 class="text-xl font-black text-white">Purchase made!</h2>
                  <p class="text-sm text-white/55">See your purchase details below.</p>
                </div>
              </div>

              <div class="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm">
                <div class="text-white/60">Product</div>
                <div class="text-white break-all font-semibold">{{ boughtModalData.product }}</div>

                <div class="mt-3 text-white/60">Date</div>
                <div class="text-white/85">{{ boughtModalData.createdAt }}</div>

                <div class="mt-3 text-white/60">Transaction ID</div>
                <div class="text-white/85 font-mono text-xs break-all">{{ boughtModalData.transactionId }}</div>
              </div>

              <button
                @click="showBoughtModal = false"
                class="w-full rounded-2xl px-4 py-3 font-bold text-sm text-white
                       bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/15 hover:border-rose-500/30 transition"
              >
                Close
              </button>
            </div>
          </div>
        </transition>
      </div>
    </transition>

    <!-- INFO MODAL -->
    <transition name="modal-fade">
      <div v-if="showInfoModal" class="fixed inset-0 z-50 flex items-center justify-center px-4">
        <div class="absolute inset-0 bg-black/60 backdrop-blur-sm" @click="showInfoModal = false"></div>

        <transition name="modal-zoom">
          <div
            class="relative w-full max-w-md rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl
                   p-6 sm:p-7 shadow-[0_24px_90px_rgba(0,0,0,0.70)] overflow-hidden"
          >
            <div class="pointer-events-none absolute -inset-1 opacity-60 bg-[radial-gradient(circle_at_top,rgba(122,167,255,0.18),transparent_55%)]"></div>

            <button
              @click="showInfoModal = false"
              class="absolute top-4 right-4 w-10 h-10 rounded-full hover:bg-white/10 transition flex items-center justify-center"
            >
              <Icon name="mdi:close" size="22" class="text-white/70" />
            </button>

            <div class="relative flex flex-col gap-5">
              <div class="flex items-center gap-3">
                <span class="w-11 h-11 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center">
                  <Icon name="material-symbols:info-rounded" size="24" class="text-[#7aa7ff]" />
                </span>
                <div>
                  <h2 class="text-xl font-black text-white">Product Info</h2>
                  <p class="text-sm text-white/55">Details about the product below.</p>
                </div>
              </div>

              <div class="rounded-2xl border border-white/10 bg-black/20 p-4 text-sm">
                <div class="text-white/60 font-semibold mb-1">Description</div>
                <div class="text-white/80 break-words">
                  {{ infoModalData.description || 'No description available.' }}
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { collection, getDocs, doc, updateDoc, getDoc, deleteField, setDoc, deleteDoc, addDoc } from 'firebase/firestore'
import { db, auth } from '~/firebase'
import TertiaryB from '~/components/TertiaryB.vue'

const products = ref([])
const loading = ref(true)
const isAdmin = ref(false)
const userBalance = ref(0)

const showEditModal = ref(false)
const selectedProduct = ref(null)

const dragActive = ref(false)
const uploadedTxtFileName = ref('')
const uploadedTxtLines = ref(0)
const uploadedTxtContent = ref('')
const newStockTxt = ref('')

const showCreateModal = ref(false)
const newProductId = ref('')
const newProductValue = ref(0)

const showBoughtModal = ref(false)
const boughtModalData = ref({
  product: '',
  amount: 0,
  buyer: '',
  createdAt: '',
  transactionId: ''
})

const searchQuery = ref('')

const showInfoModal = ref(false)
const infoModalData = ref({ description: '', id: '' })
const editDescription = ref('')

function getStockCount(product) {
  return Object.keys(product.data || {}).filter(k => !isNaN(Number(k))).length
}

const filteredProducts = computed(() =>
  products.value.filter(product => product.id.toLowerCase().includes(searchQuery.value.toLowerCase()))
)

// Abre modal de info e busca descrição
async function openInfoModal(product) {
  infoModalData.value = { description: '', id: product.id }
  const productDoc = await getDoc(doc(db, 'products', product.id))
  if (productDoc.exists()) infoModalData.value.description = productDoc.data().description || ''
  showInfoModal.value = true
}

function openEditModal(product) {
  selectedProduct.value = { ...product, data: { ...product.data } }
  editDescription.value = product.data.description || ''
  showEditModal.value = true
}

async function createProduct() {
  if (!newProductId.value || newProductValue.value < 0) return
  await setDoc(doc(db, 'products', newProductId.value), { value: newProductValue.value })
  products.value.push({ id: newProductId.value, data: { value: newProductValue.value } })
  showCreateModal.value = false
  newProductId.value = ''
  newProductValue.value = 0
}

async function saveProductEdit() {
  if (!selectedProduct.value) return

  // Atualiza preço e descrição
  await updateDoc(doc(db, 'products', selectedProduct.value.id), {
    value: selectedProduct.value.data.value,
    description: editDescription.value
  })

  // Atualiza localmente
  const product = products.value.find(p => p.id === selectedProduct.value.id)
  if (product) {
    product.data.value = selectedProduct.value.data.value
    product.data.description = editDescription.value
  }

  // Adiciona estoque via textarea e/ou arquivo
  let lines = []
  if (newStockTxt.value.trim()) {
    lines = lines.concat(newStockTxt.value.split('\n').map(l => l.trim()).filter(Boolean))
  }
  if (uploadedTxtContent.value.trim()) {
    lines = lines.concat(uploadedTxtContent.value.split('\n').map(l => l.trim()).filter(Boolean))
  }

  if (lines.length && product) {
    const keys = Object.keys(product.data).filter(k => !isNaN(Number(k))).map(Number)
    let nextNumber = keys.length ? Math.max(...keys) + 1 : 1
    const newData = { ...product.data }

    lines.forEach(line => {
      newData[nextNumber] = line
      nextNumber++
    })

    await updateDoc(doc(db, 'products', selectedProduct.value.id), newData)
    product.data = newData
  }

  showEditModal.value = false
  newStockTxt.value = ''
  uploadedTxtFileName.value = ''
  uploadedTxtContent.value = ''
  uploadedTxtLines.value = 0
}

function handleTxtUpload(e) {
  const file = e.target.files?.[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = evt => {
    const txt = String(evt.target?.result || '')
    uploadedTxtFileName.value = file.name
    uploadedTxtContent.value = txt
    uploadedTxtLines.value = txt.split('\n').filter(l => l.trim()).length
  }
  reader.readAsText(file)
}

function handleDrop(e) {
  dragActive.value = false
  const file = e.dataTransfer.files?.[0]
  if (!file || file.type !== 'text/plain') return
  const reader = new FileReader()
  reader.onload = evt => {
    const txt = String(evt.target?.result || '')
    uploadedTxtFileName.value = file.name
    uploadedTxtContent.value = txt
    uploadedTxtLines.value = txt.split('\n').filter(l => l.trim()).length
  }
  reader.readAsText(file)
}

function cancelTxtUpload() {
  uploadedTxtFileName.value = ''
  uploadedTxtContent.value = ''
  uploadedTxtLines.value = 0
}

onMounted(async () => {
  const user = auth.currentUser
  if (user) {
    const userDocRef = doc(db, 'users', user.uid)
    const userDoc = await getDoc(userDocRef)
    isAdmin.value = userDoc.exists() && userDoc.data().admin === true
    userBalance.value = userDoc.data().balance || 0
  }

  const querySnapshot = await getDocs(collection(db, 'products'))
  products.value = querySnapshot.docs.map(d => ({
    id: d.id,
    data: d.data()
  }))
  loading.value = false
})

// Função de compra: pega o menor número disponível e entrega ao cliente
async function buyProduct(productId) {
  const product = products.value.find(p => p.id === productId)
  if (!product) return

  const keys = Object.keys(product.data)
    .filter(k => !isNaN(Number(k)))
    .sort((a, b) => Number(a) - Number(b))

  if (keys.length === 0) return

  const productValue = product.data.value ?? 0
  if (userBalance.value < productValue) {
    alert('Insufficient balance to buy this product.')
    return
  }

  const firstKey = keys[0]
  const boughtValue = product.data[firstKey]

  // Remove do estoque
  await updateDoc(doc(db, 'products', productId), {
    [firstKey]: deleteField()
  })
  delete product.data[firstKey]

  // Salva transação
  const user = auth.currentUser
  const buyerName = user?.email || 'Anonymous'
  const userId = user?.uid

  const transaction = {
    buyer: buyerName,
    amount: productValue,
    product: boughtValue,
    productId,
    createdAt: new Date().toLocaleString()
  }
  const transactionRef = await addDoc(collection(db, 'transactionId'), transaction)

  // Atualiza saldo do usuário
  if (user && userId) {
    const userDocRef = doc(db, 'users', userId)
    await updateDoc(userDocRef, {
      balance: userBalance.value - productValue,
      lastTransactionId: transactionRef.id
    })
    userBalance.value -= productValue
  }

  boughtModalData.value = {
    product: boughtValue,
    amount: productValue,
    buyer: buyerName,
    createdAt: transaction.createdAt,
    transactionId: transactionRef.id
  }
  showBoughtModal.value = true
}
</script>

<style scoped>
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
