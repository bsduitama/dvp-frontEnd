<template>
    <div>
        <!-- Buscador -->
        <label for="search" class="block text-sm font-medium text-gray-700">Search</label>
        <div class="mt-1 flex p-1">
            <input v-on:keyup.enter="cargarData" v-model="search" id="search" name="search" rows="3" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm sm:text-sm" placeholder="Search">
            <svg v-on:click="cargarData"  class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>
        </div>
        <p v-if="errorSearch" class="mt-2 text-sm text-gray-500">{{ errorSearch }}</p>
    </div>
    <div class="relative z-10 mt-2 flex flex-wrap" >

        <div v-if="loading === true" class="border border-blue-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
            <div class="animate-pulse flex space-x-4">
                <div class="rounded-full bg-slate-700 h-10 w-10"></div>
                <div class="flex-1 space-y-6 py-1">
                <div class="h-2 bg-slate-700 rounded"></div>
                <div class="space-y-3">
                    <div class="grid grid-cols-3 gap-4">
                    <div class="h-2 bg-slate-700 rounded col-span-2"></div>
                    <div class="h-2 bg-slate-700 rounded col-span-1"></div>
                    </div>
                    <!-- <div class="h-2 bg-slate-700 rounded"></div> -->
                </div>
                </div>
            </div>
        </div>

        <div v-if="totalUsers == 0">
            <p>No hay datos</p>
        </div>

        <!-- tarjetas de presentacion usuario -->
        <div class="relative p-2 w-1/2" v-for="user in users">
            <div class="w-[20.5rem] divide-y divide-slate-400/20 rounded-lg bg-white text-[0.8125rem] leading-5 text-slate-900 shadow-xl shadow-black/5 ring-1 ring-slate-700/10">
                <div class="flex items-center p-4">
                    <img :src="user.avatar_url" :alt="user.login" class="h-10 w-10 flex-none rounded-full">
                    <div class="ml-4 flex-auto">
                        <div class="font-medium">{{ user.login }}</div>
                        <div class="mt-1 text-slate-700">{{ user.id }}</div>
                    </div>
                    <div class="pointer-events-auto ml-4 flex-none rounded-md py-[0.3125rem] px-2 font-medium text-slate-700 shadow-sm ring-1 ring-slate-700/10 hover:bg-slate-50">
                        <!-- <router-link to="/user"></router-link> -->
                        <router-link :to="{ name: 'user', params: { login: user.login }}">
                            View
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <!-- pagination of users -->
        <div class="w-full justify-self-center flex justify-center">
            <pagination
                v-if="pages > itemsPage"
                v-model="pg"
                :pages="pages"
                :range-size="1"
                active-color="#DCEDFF"
                @update:modelValue="setPage"></pagination>

        </div>
    </div>
</template>

<script>
import axios from "axios";
import pagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";

export default {
    components: {
        pagination
    },
    data() {
        return {
            users: [],
            totalUsers: 0,
            loading: false,
            search: "",
            pg: 1,
            pages: 0,
            itemsPage: 25,
            urlBase: 'https://api.github.com/search/users?',
            error: true
        }
    },
    methods:{
        async cargarData() {
            if (this.error == false && this.search.length > 0) {
                this.loading = true;
                await axios.get('' + this.urlBase
                                + 'q=' + this.search
                                + '&per_page=25'
                                + '&page=' + this.pg).then((res) => {
                    this.totalUsers = res.data.total_count
                    this.users = res.data.items
                    this.pages = parseInt(this.totalUsers / this.itemsPage)
                    console.log('Pages: ' + this.totalUsers)

                    if ((this.totalUsers % this.itemsPage) > 0) {
                       ++this.pages
                    }
                    console.log('Pages: ' + this.pages)

                    console.log(this.totalUsers)
                    this.loading = false
                });
            }
        },
        setPage(){
            // this.page = page
            this.cargarData()
        },
    },
    mounted (){
        this.cargarData()
    },
    computed: {
        errorSearch : function () {
            this.error = false
            if (this.search.length < 4 && this.search.length > 0) {
                this.error = true
                return "El usuario debe tener mas de 4 caracteres"
            }
            if (this.search === "doublevpartners") {
                this.error = true
                return "El usuario 'doublevpartners' no se puede buscar."
            }
        }
    },
};



</script>
