<script setup lang="ts" xmlns="http://www.w3.org/1999/html">

import {onMounted, ref} from "vue";
import axios from "axios"

const messageAddModel = ref<{
    text?: string,
}>({});

const messageGetModel = ref<{
    id?: number,
}>({});

async function addMessage() {
    await axios.post(`/api/messages`, {
        text: messageAddModel.value?.text
    }).then(response => {
        messageGetModel.value = {
            id: response.data.id
        };
    }).finally(() => {
        messageAddModel.value = {};
    });
}

async function getMessage() {
    await axios.get(`/api/messages/${messageGetModel.value?.id}`)
        .then(response => {
            messageAddModel.value = {
                text: response.data.text
            };
        }).finally(() => {
            messageGetModel.value = {};
        });
}


</script>

<template>
    <main>
        <h2>Hello World!</h2>
        <img src="@/assets/app.png" alt="app">
        <div>
            <input type="text" v-model="messageAddModel.text">
            <button @click="addMessage">Add Message</button>
        </div>
        <div>
            <input type="text" v-model="messageGetModel.id">
            <button @click="getMessage">Get Message</button>
        </div>
    </main>
</template>

<style>

</style>
