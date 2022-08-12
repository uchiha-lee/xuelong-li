<template>
    <div>
        {{ store.helloworld }}
    </div>
</template>

<!-- <script>
export default {

}
</script> -->

<script setup lang="ts">
import { useStore } from "../store/index"

const store = useStore()


</script>

<style scoped>

</style>