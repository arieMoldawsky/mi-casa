<template>
    <el-form
        @submit.native.prevent="isSignup ? onSignup() : onLogin()"
        class="modal-content"
        ref="form"
        :model="userCred"
        size="medium"
    >
        <el-form-item v-if="isSignup">
            <el-input placeholder="User Name" v-model="userCred.username" />
        </el-form-item>
        <el-form-item>
            <el-input placeholder="Email" v-model="userCred.email" />
        </el-form-item>
        <el-form-item>
            <el-input
                placeholder="Password"
                v-model="userCred.password"
                show-password
            />
            <form @submit.prevent>
                <label>
                    Upload a Profile Picture:
                    <input @change="onUploadImg" type="file" name="" id="" />
                </label>
            </form>
        </el-form-item>
        <!-- <el-form-item v-if="isSignup">
      <el-checkbox
        size="small"
        v-model="userCred.isAdmin"
        label="Admin?"
        border
      />
    </el-form-item> -->
        <el-form-item>
            <el-button v-if="isSignup" native-type="submit">Sign Up</el-button>
            <el-button v-else native-type="submit">Log In</el-button>
            <slot />
        </el-form-item>
    </el-form>
</template>

<script>
import { uploadImg } from "../services/img.upload.service.js";

export default {
    data() {
        return {
            userCred: {
                fullName: null,
                email: null,
                password: null,
                imgUrl: "",
            },
        };
    },
    methods: {
        async onLogin() {
            try {
                const res = await this.$store.dispatch({
                    type: "login",
                    userCred: this.userCred,
                });
                this.$emit("closeModal");
            } catch (error) {
                console.log("Cannot Login", error);
            }
        },
        async onSignup() {
            try {
                const res = await this.$store.dispatch({
                    type: "signup",
                    userCred: this.userCred,
                });
                this.$emit("closeModal");
            } catch (error) {
                console.log("Cannot Sign Up", error);
            }
        },
        async onUploadImg(ev) {
            const res = await uploadImg(ev);
            console.log(res.url);
            this.userCred.imgUrl = res.url;
        },
    },
    computed: {
        isSignup() {
            console.log(this.$route.query.q);
            return this.$route.query.q === "signup";
        },
        loggedInUser() {
            return this.$store.getters.loggedInUser;
        },
        isLoading() {
            return this.$store.state.isLoading;
        },
    },
};
</script>
