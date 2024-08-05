<script setup> 
</script>

<template>

        <header class="bg-[#086788]">
            <nav class="flex justify-between items-center w-[92%] mx-auto">
                <a href="/">
                    <div>
                        <img class="w-16" src="" alt="logo">
                    </div>
                </a>
                <div class="md:static absolute bg-[#086788] text-2xl text-blue-100 md:min-h-fit min-h-[60vh] left-0 top-[-100%] md:w-auto w-full flex items-center px-5 ">
                    <ul class="flex md:flex-row flex-col md:items-center md:gap-[4vw] gap-8">
                        <li>
                            <a href="/wishlist">Wishlist</a>
                        </li>
                        <li>
                            <a href="/cart">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
                                    <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
                                </svg>
                            </a>
                        </li>
                    </ul>
                </div>
                <div>
                    <button class="bg-blue-500 text-white px-5 py-2 rounded hover:bg-[#0f084b]">Login</button>
                </div>
            </nav>
          </header>

</template>

<style scoped>
</style>