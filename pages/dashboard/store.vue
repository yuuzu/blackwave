<template>
  <div class="w-full min-h-screen flex items-center justify-center font-satoshi bg-[#0a0a0a]">
    <div
      class="bg-[#111111] rounded-2xl shadow px-4 sm:px-6 md:px-10 py-6 sm:py-8 md:py-12 flex flex-col items-center gap-6 w-full max-w-full max-w-xl sm:max-w-6xl">
      <div class="flex flex-col items-center mb-6">
        <Icon name="solar:cart-bold" size="48px" class="text-[#8591a5]" />
        <h2 class="text-2xl font-bold text-white">Store</h2>
        <p class="text-[#8591a5] text-sm text-center">Here you can buy products with your balance.</p>
      </div>
      <!-- Barra de pesquisa -->
      <div class="w-full mb-4">
        <input v-model="searchQuery" type="text" placeholder="Search product name..."
          class="w-full bg-[#0d0e11]/10 border-[#1b1b20] border-[1px] border rounded-lg py-2 px-4 text-[#fafafa] placeholder-[#939193] focus:outline-none focus:border-[#576784] transition" />
      </div>
      <div v-if="loading" class="flex justify-center items-center w-full py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-l-2 border-[#8591a5] border-r-2 border-[#181818]"></div>
      </div>
      <div v-else-if="filteredProducts.length === 0" class="text-[#b8b8b8] text-center">No products available.</div>
      <div v-else class="w-full">
        <div class="w-full products-scroll">
          <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
            <div v-for="product in filteredProducts" :key="product.id"
              class="bg-[#0d0e11]/10 border-[#1b1b20] border-[1px] rounded-lg p-3 shadow-md flex flex-col gap-1"
              style="backdrop-filter: blur(8px); min-width: 0; max-width: 100%;">
              <NuxtImg src="/images/download.png" alt="Product Icon" class="rounded-lg w-full h-28 object-cover mb-2" />
              <h2 class="text-base font-semibold text-[#fafafa] truncate">🛒 {{ product.id }}</h2>
              <span class="text-xs text-[#b8b8b8]">💸 Price: R$ {{ product.data.value ?? 0 }}</span>
              <div v-if="!bought[product.id]" class="flex flex-col gap-1">
                <span class="text-xs text-[#b8b8b8]">📦 {{Object.keys(product.data).filter(k =>
                  !isNaN(Number(k))).length}}</span>
                <div class="flex flex-row gap-2 mt-1">
                  <TertiaryB @click="buyProduct(product.id)"
                    class="bg-[#1a3a1a] border-[#235723] hover:border-[#235723]/60 text-white flex-1"
                    :disabled="Object.keys(product.data).filter(k => !isNaN(Number(k))).length === 0">
                    Buy
                  </TertiaryB>
                  <TertiaryB
                    class="flex justify-center items-center max-w-16 px-4 py-2 rounded bg-[#586885]/40 border border-[#586885]/50 text-white font-bold hover:bg-[#586885]/50 hover:border-[#586885]/60 flex-1"
                    @click="openInfoModal(product)">
                    <Icon name="material-symbols:info-rounded" size="22px"></Icon>
                  </TertiaryB>
                  <TertiaryB v-if="isAdmin" @click="openEditModal(product)"
                    class="flex justify-center items-center max-w-16 px-4 py-2 rounded bg-[#8591a5]/40 border border-[#8591a5]/50 text-white font-bold hover:bg-[#8591a5]/50 hover:border-[#8591a5]/60 flex-1">
                    <Icon name="material-symbols:edit-outline-rounded" size="22px"></Icon>
                  </TertiaryB>
                </div>
              </div>
            </div>
            <!-- Botão de criar produto como card -->
            <div v-if="isAdmin"
              class="flex flex-col items-center min-w-0 max-w-full h-[260px] justify-center bg-[#181818] border-2 border-dashed border-[#8591a5] rounded-lg p-3 shadow-md cursor-pointer transition hover:border-[#8591a5]/80"
              @click="showCreateModal = true">
              <Icon name="material-symbols:add-box" size="48" class="text-[#8591a5] mb-2" />
              <span class="text-base font-semibold text-[#fafafa] mb-1">New Product</span>
              <span class="text-xs text-[#8591a5] text-center">Click to add</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <transition name="modal-fade">
    <div v-if="showEditModal" class="fixed inset-0 z-50 flex items-center justify-center font-satoshi">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <transition name="modal-zoom">
        <div
          class="relative bg-[#0a0a0a] rounded-3xl p-8 w-full max-w-lg flex flex-col gap-6 shadow-2xl border border-[#232323]/30"
          v-if="showEditModal">
          <button @click="showEditModal = false"
            class="absolute top-4 right-4 text-[#8591a5] hover:text-white text-2xl transition">
            <Icon name="mdi:close" />
          </button>
          <div class="flex flex-col items-center">
            <Icon name="material-symbols:edit-outline-rounded" size="48" class="text-[#8591a5]" />
            <h2 class="text-2xl font-bold mb-2 text-white">Edit Products</h2>
            <p class="text-[#8591a5] text-sm text-center">Change product information, price, description or inventory.
            </p>
          </div>
          <div class="flex flex-col gap-3">
            <label class="text-sm text-[#fafafa]">Price:</label>
            <input v-model.number="selectedProduct.data.value" type="number" min="0"
              class="rounded-lg px-4 py-3 bg-[#232323] text-[#FAFAFA] outline-none transition" />

            <label class="text-sm text-[#fafafa]">Description:</label>
            <input v-model="editDescription" rows="3"
              class="rounded-lg px-4 py-3 bg-[#232323] text-[#FAFAFA] outline-none transition"
              placeholder="No description available"></input>

            <label class="text-sm text-[#fafafa]">Add stock (per line):</label>
            <textarea v-model="newStockTxt"
              class="max-h-12 rounded-lg px-4 py-3 bg-[#232323] text-[#FAFAFA] outline-none transition" rows="3"
              placeholder="Each line is a product"></textarea>
            <!-- ...upload de arquivo continua igual... -->
            <div
              class="border-2 border-dashed border-[#8591a5] rounded-xl p-4 text-center bg-[#181818] transition hover:border-[#8591a5]/80 cursor-pointer flex flex-col items-center"
              @dragover.prevent="dragActive = true" @dragleave.prevent="dragActive = false" @drop.prevent="handleDrop"
              :class="{ 'border-[#fafafa] bg-[#232323]': dragActive }">
              <span v-if="!uploadedTxtFileName" class="block text-[#8591a5] mb-2">
                Drag a .txt file here or click to select
              </span>
              <input type="file" accept=".txt" @change="handleTxtUpload" class="hidden" ref="fileInput" />
              <button v-if="!uploadedTxtFileName" type="button"
                class="px-3 py-1 rounded bg-[#232323] text-[#fafafa] text-xs border border-[#8591a5] hover:bg-[#8591a5]/20"
                @click="$refs.fileInput.click()">
                Select .txt file
              </button>
              <div v-if="uploadedTxtFileName"
                class="mt-3 flex flex-col justify-center items-center gap-2 text-xs text-[#fafafa]">
                <span class="font-bold">{{ uploadedTxtFileName }} ({{ uploadedTxtLines }} lines)</span>
                <button type="button"
                  class="px-2 py-1 rounded bg-[#530f0f] text-[#fafafa] text-xs border border-[#750c0c] hover:bg-[#8c0a0a]/20"
                  @click="cancelTxtUpload">
                  Cancel
                </button>
              </div>
            </div>
          </div>
          <div class="flex flex-row gap-2">
            <TertiaryB @click="saveProductEdit"
              class="bg-[#1a3a1a] border-[#235723] hover:border-[#2e8c2e] text-white flex-1">Save</TertiaryB>
            <TertiaryB @click="showEditModal = false"
              class="bg-[#530f0f] border-[#750c0c] hover:border-[#8c0a0a] text-white flex-1">Cancel</TertiaryB>
          </div>
        </div>
      </transition>
    </div>
  </transition>
  <transition name="modal-fade">
    <div v-if="showCreateModal" class="fixed inset-0 z-50 flex items-center justify-center font-satoshi">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <transition name="modal-zoom">
        <div
          class="relative bg-[#0a0a0a] rounded-3xl p-8 w-full max-w-lg flex flex-col gap-2 shadow-2xl border border-[#232323]/30">
          <button @click="showCreateModal = false"
            class="absolute top-4 right-4 text-[#8591a5] hover:text-white text-2xl transition">
            <Icon name="mdi:close" />
          </button>
          <div class="flex flex-col items-center mb-6">
            <Icon name="material-symbols:add-box" size="48" class="text-[#8591a5]" />
            <h2 class="text-2xl font-bold text-white">Create Product</h2>
            <p class="text-[#8591a5] text-sm text-center">Create a new product and set the price.</p>
          </div>
          <label class="text-sm text-[#fafafa]">Product Name:</label>
          <input v-model="newProductId"
            class="rounded-lg mb-4 px-4 py-3 bg-[#232323] text-[#FAFAFA] outline-none transition" />
          <label class="text-sm text-[#fafafa]">Price:</label>
          <input v-model.number="newProductValue" type="number" min="0"
            class="rounded-lg px-4 py-3 bg-[#232323] text-[#FAFAFA] outline-none transition" />
          <div class="flex flex-row gap-2 mt-4">
            <TertiaryB @click="createProduct"
              class="bg-[#1a3a1a] border-[#235723] hover:border-[#2e8c2e] text-white flex-1">Create</TertiaryB>
            <TertiaryB @click="showCreateModal = false"
              class="bg-[#530f0f] border-[#750c0c] hover:border-[#8c0a0a] text-white flex-1">Cancel</TertiaryB>
          </div>
        </div>
      </transition>
    </div>
  </transition>
  <transition name="modal-fade">
    <div v-if="showBoughtModal" class="fixed inset-0 z-50 flex items-center justify-center font-satoshi">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <transition name="modal-zoom">
        <div
          class="relative bg-[#0a0a0a] rounded-3xl p-8 w-full max-w-md flex flex-col gap-6 shadow-2xl border border-[#232323]/30"
          v-if="showBoughtModal">
          <button @click="showBoughtModal = false"
            class="absolute top-4 right-4 text-[#8591a5] hover:text-white text-2xl transition">
            <Icon name="mdi:close" />
          </button>
          <div class="flex flex-col items-center">
            <Icon name="material-symbols:check-circle-rounded" size="48" class="text-[#8591a5]" />
            <h2 class="text-2xl font-bold mb-2 text-white">Purchase made!</h2>
            <p class="text-[#8591a5] text-sm text-center">See your purchase details below</p>
          </div>
          <div class="flex flex-col gap-2 bg-[#181818] rounded-xl p-4">
            <span class="text-[#fafafa] text-base font-bold">Product:</span>
            <span class="text-[#b8b8b8] break-all">{{ boughtModalData.product }}</span>
            <span class="text-[#fafafa] text-base font-bold">Date:</span>
            <span class="text-[#b8b8b8]">{{ boughtModalData.createdAt }}</span>
            <span class="text-[#fafafa] text-base font-bold">Transaction ID:</span>
            <span class="text-[#8591a5] font-mono text-xs">{{ boughtModalData.transactionId }}</span>
          </div>
          <div class="flex flex-row gap-2 mt-2">
            <TertiaryB @click="showBoughtModal = false"
              class="bg-[#530f0f] border-[#750c0c] hover:border-[#8c0a0a] text-white flex-1">Close</TertiaryB>
          </div>
        </div>
      </transition>
    </div>
  </transition>
  <transition name="modal-fade">
    <div v-if="showInfoModal" class="fixed inset-0 z-50 flex items-center justify-center font-satoshi">
      <div class="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      <transition name="modal-zoom">
        <div
          class="relative bg-[#0a0a0a] rounded-3xl p-8 w-full max-w-md flex flex-col gap-6 shadow-2xl border border-[#232323]/30"
          v-if="showInfoModal">
          <button @click="showInfoModal = false"
            class="absolute top-4 right-4 text-[#8591a5] hover:text-white text-2xl transition">
            <Icon name="mdi:close" />
          </button>
          <div class="flex flex-col items-center">
            <Icon name="material-symbols:info-rounded" size="48" class="text-[#8591a5]" />
            <h2 class="text-2xl font-bold mb-2 text-white">Product Info</h2>
            <p class="text-[#8591a5] text-sm text-center">Details about the product below:</p>
          </div>
          <div class="flex flex-col gap-2 bg-[#181818] rounded-xl p-4">
            <span class="text-[#fafafa] text-base font-bold">Description</span>
            <span v-if="infoModalData.description" class="text-[#b8b8b8] break-all">{{ infoModalData.description
            }}</span>
            <span v-else class="text-[#b8b8b8] break-all">No description available.</span>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { collection, getDocs, doc, updateDoc, getDoc, deleteField, setDoc, deleteDoc, addDoc } from 'firebase/firestore'
import { db, auth } from '~/firebase'
import TertiaryB from '~/components/TertiaryB.vue'

const products = ref([])
const loading = ref(true)
const bought = ref({})
const newStock = ref({})
const isAdmin = ref(false)
const userBalance = ref(0)

const showEditModal = ref(false)
const selectedProduct = ref(null)

const dragActive = ref(false)
const uploadedTxtFileName = ref('')
const uploadedTxtLines = ref(0)
const uploadedTxtContent = ref('')

const showCreateModal = ref(false)
const newProductId = ref('')
const newProductValue = ref(0)
const showDeleteConfirm = ref(false)

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


// Abre modal de info e busca descrição
async function openInfoModal(product) {
  infoModalData.value = { description: '', id: product.id }
  editDescription.value = ''
  const productDoc = await getDoc(doc(db, 'products', product.id))
  if (productDoc.exists()) {
    infoModalData.value.description = productDoc.data().description || ''
    editDescription.value = productDoc.data().description || ''
  }
  showInfoModal.value = true
}

// Salva descrição editada
async function saveDescription() {
  if (!infoModalData.value.id) return
  await updateDoc(doc(db, 'products', infoModalData.value.id), {
    description: editDescription.value
  })
  infoModalData.value.description = editDescription.value
}

// Computed para filtrar produtos pelo nome/id
const filteredProducts = computed(() =>
  products.value.filter(product =>
    product.id.toLowerCase().includes(searchQuery.value.toLowerCase())
  )
)

async function createProduct() {
  if (!newProductId.value || newProductValue.value < 0) return
  await setDoc(doc(db, 'products', newProductId.value), { value: newProductValue.value })
  products.value.push({ id: newProductId.value, data: { value: newProductValue.value } })
  showCreateModal.value = false
  newProductId.value = ''
  newProductValue.value = 0
}

async function deleteProduct() {
  if (!selectedProduct.value) return
  await deleteDoc(doc(db, 'products', selectedProduct.value.id))
  products.value = products.value.filter(p => p.id !== selectedProduct.value.id)
  showEditModal.value = false
  showDeleteConfirm.value = false
}

function openEditModal(product) {
  selectedProduct.value = { ...product }
  editDescription.value = product.data.description || ''
  showEditModal.value = true
}

const newStockTxt = ref('')

async function saveProductEdit() {
  if (!selectedProduct.value) return
  // Atualiza preço e descrição
  await updateDoc(doc(db, 'products', selectedProduct.value.id), {
    value: selectedProduct.value.data.value,
    description: editDescription.value
    // Adicione outros campos se necessário
  })

  // Atualiza localmente
  const product = products.value.find(p => p.id === selectedProduct.value.id)
  product.data.value = selectedProduct.value.data.value
  product.data.description = editDescription.value

  // Adiciona estoque via textarea
  let lines = []
  if (newStockTxt.value.trim()) {
    lines = lines.concat(newStockTxt.value.split('\n').map(l => l.trim()).filter(l => l))
  }
  // Adiciona estoque via arquivo txt
  if (uploadedTxtContent.value.trim()) {
    lines = lines.concat(uploadedTxtContent.value.split('\n').map(l => l.trim()).filter(l => l))
  }

  if (lines.length > 0) {
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
  const file = e.target.files[0]
  if (!file) return
  const reader = new FileReader()
  reader.onload = function (evt) {
    uploadedTxtFileName.value = file.name
    uploadedTxtContent.value = evt.target.result
    uploadedTxtLines.value = evt.target.result.split('\n').filter(l => l.trim()).length
  }
  reader.readAsText(file)
}

function handleDrop(e) {
  dragActive.value = false
  const file = e.dataTransfer.files[0]
  if (file && file.type === "text/plain") {
    const reader = new FileReader()
    reader.onload = function (evt) {
      uploadedTxtFileName.value = file.name
      uploadedTxtContent.value = evt.target.result
      uploadedTxtLines.value = evt.target.result.split('\n').filter(l => l.trim()).length
    }
    reader.readAsText(file)
  }
}

function cancelTxtUpload() {
  uploadedTxtFileName.value = ''
  uploadedTxtContent.value = ''
  uploadedTxtLines.value = 0
  // Limpa o input para permitir novo upload
  if ($refs.fileInput) $refs.fileInput.value = ''
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
  products.value = querySnapshot.docs.map(doc => ({
    id: doc.id,
    data: doc.data()
  }))
  loading.value = false
})

// Função de compra: pega o menor número disponível e entrega ao cliente
async function buyProduct(productId) {
  const product = products.value.find(p => p.id === productId)
  const keys = Object.keys(product.data)
    .filter(k => !isNaN(Number(k)))
    .sort((a, b) => Number(a) - Number(b))
  if (keys.length === 0) return

  const productValue = product.data.value ?? 0.5
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

  // ...dentro da função buyProduct...

  const user = auth.currentUser
  let buyerName = user?.email || 'Anonymous'
  let userId = user?.uid
  if (user) {
    const userDocRef = doc(db, 'users', userId)
    await updateDoc(userDocRef, { balance: userBalance.value - productValue })
    userBalance.value -= productValue
  }

  // Salva transação na coleção transactionId
  const transaction = {
    buyer: buyerName,
    amount: productValue,
    product: boughtValue,
    productId,
    createdAt: new Date().toLocaleString()
  }
  const transactionRef = await addDoc(collection(db, 'transactionId'), transaction)

  // Atualiza o campo lastTransactionId no documento do usuário
  if (userId) {
    await updateDoc(doc(db, 'users', userId), {
      lastTransactionId: transactionRef.id
    })
  }

  // Exibe modal com dados da compra
  boughtModalData.value = {
    product: boughtValue,
    amount: productValue,
    buyer: buyerName,
    createdAt: transaction.createdAt,
    transactionId: transactionRef.id
  }
  showBoughtModal.value = true

}

async function addStock(productId) {
  const product = products.value.find(p => p.id === productId)
  const keys = Object.keys(product.data)
    .filter(k => !isNaN(Number(k)))
    .map(k => Number(k))
  const nextNumber = keys.length ? Math.max(...keys) + 1 : 1
  const value = newStock.value[productId]
  if (!value) return
  const newData = { ...product.data, [String(nextNumber)]: value }
  await updateDoc(doc(db, 'products', productId), newData)
  product.data = newData
  newStock.value[productId] = ''
}
</script>

<style scoped>
.products-scroll {
  max-height: 540px;
  overflow-y: auto;
  /* Custom scrollbar */
  scrollbar-width: thin;
  scrollbar-color: #8591a5 #181818;
}

.products-scroll::-webkit-scrollbar {
  width: 8px;
}

.products-scroll::-webkit-scrollbar-thumb {
  background: #8591a5;
  border-radius: 8px;
}

.products-scroll::-webkit-scrollbar-track {
  background: #181818;
  border-radius: 8px;
}
</style>