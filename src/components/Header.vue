<template>
    <header>
        <v-img 
        aspect-ratio="4"
        src="https://images.theconversation.com/files/65433/original/image-20141125-8669-b5tola.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=926&fit=clip"
        ></v-img>
        <h1 
        class="text-center primary white--text"
        >
        {{name}}
        </h1>
    </header>
</template>

<script>
export default {
    props: ['name']
}
</script>