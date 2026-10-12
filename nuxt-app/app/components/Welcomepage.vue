<template>
    <nav class="navbar">
        <h1>Qr code Generator</h1>

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
            <li><a href="#" @click="isOpen = false">About Us</a></li>
            <li><a href="#" @click="isOpen = false">Contact ME</a></li>
        </ul>
    </nav>
</template>

<script setup>
const isOpen = ref(false)
</script>

<style>
body {
    margin: 0;
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
    background-color: #c6c2c2;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.navbar h1 {
    margin: 0;
    font-size: 1.4rem;
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
        background-color: #c6c2c2;
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