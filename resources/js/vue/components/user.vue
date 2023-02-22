<template>
    <div class="flex justify-between">
        <div>
            <label class="block text-sm font-medium text-gray-700">Photo</label>
            <div class="mt-1 flex items-center">
                <img :src="user.avatar_url" :alt="user.login" class="h-10 w-10 flex-none rounded-full">
            </div>
        </div>
        <div class="col-span-6 sm:col-span-3">
            <label for="first-name" class="block text-sm font-medium text-gray-700">id</label>
            <input v-model="user.id" readOnly type="text" name="first-name" id="first-name" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
        </div>
    </div>
    <div class="flex justify-between">
        <div class="p-1 w-full">
            <label for="user" class="block text-sm font-medium text-gray-700">User</label>
            <input v-model="user.login" readOnly type="text" name="user" id="user" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
        </div>
        <div class="p-1 w-full" v-if="user.company">
            <label for="company" class="block text-sm font-medium text-gray-700">company</label>
            <input v-model="user.company" readOnly type="text" name="company" id="company" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
        </div>
    </div>
    <div class="flex justify-between">
        <div class="p-1 w-full">
            <label for="urlGit" class="block text-sm font-medium text-gray-700">User</label>
            <input v-model="user.html_url" readOnly type="text" name="urlGit" id="urlGit" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm">
        </div>
    </div>
    <div>
        <div>
            <!-- <font-awesome-icon icon="fa-solid fa-users" /> -->
            <span></span>
        </div>
        <div></div>
        <div></div>
    </div>
</template>

<script>
    import axios from "axios";
    export default {
        props: ["login"],
        data() {
            return {
                user: [],
                loading: true,
                urlBase: 'https://api.github.com/users/',
            }
        },
        methods:{
            async cargarData() {
                if (this.search != "") {
                    this.loading = true;
                    await axios.get('' + this.urlBase + this.login
                                ).then((res) => {
                        this.totalUsers = res.data.total_count
                        this.user = res.data
                        console.log(this.user)
                        this.loading = false
                    });
                }
            },
        },
        // created() {
        //     this.$watch(
        //     () => this.$route.params,
        //     (toParams, previousParams) => {
        //         console.log(toParams)
        //         // react to route changes...
        //     }
        //     )
        // },
        mounted (){
            this.cargarData()
        },
    }
</script>
