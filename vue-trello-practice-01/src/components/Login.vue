<template>
    <div class="login">
        <h2>Log in to Trello</h2>
        <form @submit.prevent="onSubmit">
            <div>
                <label for="email">Email</label>
                <input class="form-control" type="text" name="email" v-model="email" autofocus
                    placeholder="e.g., test@test.com" />
            </div>
            <div>
                <label for="password">Passwrod</label>
                <input class="form-control" type="password" v-model="password" placeholder="123123" />
            </div>
            <button class="btn" :class="{'btn-success': !invalidForm}" type="submit" :disabled="invalidForm">Log
                In</button>
        </form>
        <p class="error" v-if="error">{{error}}</p>
    </div>
</template>

<script>
    import api, { setAuthorizationHeader } from '../api'
    import {mapMutations} from 'vuex'

    export default {
        data() {
            return {
                email: '',
                password: '',
                error: '',
            }
        },
        computed: {
            invalidForm() {
                if (this.email.length > 0 && this.password.length > 0) {
                    return false
                }
                else {
                    return true
                }
            }
        },
        methods: {
            ...mapMutations([
                'SET_TOKEN'
            ]),
            onSubmit() {
                this.error = ''
                api.login(this.email, this.password)
                    .then(data => {
                        this.SET_TOKEN(data.accessToken)
                        localStorage.setItem('token', data.accessToken)
                        setAuthorizationHeader(data.accessToken)
                        this.$router.push('/')
                    })
                    .catch(err => {
                        this.error = err.data.error
                    })
            }
        }
    }
</script>

<style>
    .login {
        width: 400px;
        margin: 0 auto;
    }

    .error {
        color: #f00;
    }
</style>