<template>
    <div>
        <nav class="navbar">
            <a href="#" class="brand">Qr code Generator</a>

            <button
                class="hamburger"
                :class="{ open: isOpen }"
                aria-label="Toggle menu"
                :aria-expanded="isOpen"
                @click="isOpen = !isOpen"
            >
                <span></span>
                <span></span>
                <span></span>
            </button>

            <ul class="nav-links" :class="{ open: isOpen }">
                <li><a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank" rel="noopener noreferrer">About Us</a></li>
                <li><a
  href="https://github.com/unknown-python3672"
  target="_blank"
  rel="noopener noreferrer"
>Contact ME</a></li>
            </ul>
        </nav>

        <main class="content">
            <h1>Welcome to the QR Code Generator</h1>
            <p>Generate a QR code in seconds for any URL of your choice</p>

            <form class="qr-form" @submit.prevent="generate">
                <input
                    v-model="url"
                    class="url-input"
                    type="text"
                    inputmode="url"
                    placeholder="Enter the URL"
                    aria-label="URL to encode"
                />
                <button type="submit" class="generate-btn">GENERATE</button>
            </form>

            <p v-if="error" class="error" role="alert">{{ error }}</p>

            <div v-if="qrSrc" class="result">
                <img :src="qrSrc" alt="QR code" width="300" height="300" @error="onError" />
                <a :href="downloadHref" class="download">Download PNG</a>
            </div>
        </main>
    </div>
</template>

<script setup>
const API = import.meta.dev
  ? 'http://localhost:8080'
  : 'https://qr-code-be-l95m.onrender.com'

const isOpen = ref(false)
const url = ref('')
const qrSrc = ref('')
const error = ref('')

const downloadHref = computed(() => `${qrSrc.value}&download=true`)

function normalizeUrl(input) {
    const value = input.trim()
    if (!value) return null

    const withScheme = /^https?:\/\//i.test(value) ? value : `https://${value}`
    try {
        return new URL(withScheme).href
    } catch {
        return null
    }
}

function generate() {
    error.value = ''
    const value = normalizeUrl(url.value)

    if (!value) {
        qrSrc.value = ''
        error.value = 'Please enter a valid URL, e.g. https://example.com'
        return
    }

    qrSrc.value = `${API}/api/qrcode/qr?url=${encodeURIComponent(value)}&size=300`
}

function onError() {
    qrSrc.value = ''
    error.value = 'Could not generate the QR code. Is the backend running?'
}

const sendPing = async () => {
    try {
        const response = await fetch('https://qr-code-be-l95m.onrender.com/')
        if (!response.ok) throw new Error('Ping failed')
        console.log('Ping successful')
    } catch (err) {
        console.error('Ping error:', err)
    }
}
sendPing();
</script>

<style>
* {
    box-sizing: border-box;
}

body {
    margin: 0;
    font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
    background-image: url('/bg.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    background-attachment: fixed;
    min-height: 100vh;
}

</style>

<style scoped>
.navbar {
    position: sticky;
    top: 0;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    background-color: #c6c2c20c;
    border-bottom: 1px solid #cccccc67;
}

.brand {
    font-size: 1.4rem;
    font-weight: bold;
    color: inherit;
    text-decoration: none;
}

.nav-links {
    display: flex;
    gap: 24px;
    list-style: none;
    margin: 0;
    padding: 0;
}

.nav-links a {
    color: inherit;
    text-decoration: none;
}

.hamburger {
    display: none;
}

.content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 40px 20px;
}

.qr-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    max-width: 420px;
}

.url-input {
    width: 100%;
    height: 40px;
    margin-top: 20px;
    padding: 5px 10px;
    border: 1px solid black;
    border-radius: 5px;
}

.generate-btn {
    width: 100%;
    max-width: 200px;
    margin-top: 15px;
    padding: 14px;
    border: 1px solid black;
    border-radius: 10px;
    color: white;
    background-color: black;
    cursor: pointer;
}

.error {
    margin-top: 15px;
    color: crimson;
}

.result {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 12px;
    margin-top: 30px;
}

.result img {
    max-width: 100%;
    height: auto;
}

.download {
    color: black;
}

@media (max-width: 768px) {
    .hamburger {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 28px;
        height: 20px;
        padding: 0;
        background: none;
        border: none;
        cursor: pointer;
    }

    .hamburger span {
        display: block;
        width: 100%;
        height: 3px;
        background-color: #222;
        border-radius: 2px;
        transition: transform 0.3s, opacity 0.3s;
    }

    .hamburger.open span:nth-child(1) {
        transform: translateY(8.5px) rotate(45deg);
    }

    .hamburger.open span:nth-child(2) {
        opacity: 0;
    }

    .hamburger.open span:nth-child(3) {
        transform: translateY(-8.5px) rotate(-45deg);
    }

    .nav-links {
        display: none;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        flex-direction: column;
        gap: 0;
        background-color: #7d7a7ad8;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    .nav-links.open {
        display: flex;
    }

    .nav-links a {
        display: block;
        padding: 14px 20px;
    }
}
</style>