<template>
    <div class="toggle" @click="onCheckInner" :isCheck="isCheck" :class="[isActive ? activeClass : '', errorClass]">
        <span class="toggle__indicator">
            <span class="toggle__icon"></span>
            <span class="toggle__overlay"></span>
        </span>
        <div class="toggle__text"><slot></slot></div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            //checkValue: this.isCheck
            //classActive: ''
            isActive: false,
            activeClass: 'active',
            errorClass: 'text-danger'
        }
    },
    props: {
        isCheck: Boolean,
        //onCheck: Function
    },
    methods: {
        onCheckInner() {
            this.isActive=!this.isActive
    

            this.$emit('onCheck', !this.isCheck);
            
        },
    }
}
</script>

<style lang="scss">
.toggle {
    font-size:13px;
    text-align:left;
    &__indicator {
        display: inline-block !important;
        width: 52px !important;
        height: 32px !important;
        position: relative !important;
        background-color: #afafaf;
        border-radius: 40px;
        margin-left: 15px;
    }
    &__text {
        padding-left: 15px;
        display: inline-block;
        height: 32px;
        vertical-align: bottom;
    }
    &__icon {
        width: 28px !important;
        height: 28px !important;
        display: block !important;
        position: absolute !important;
        top: 2px !important;
        left: 2px !important;
        background-color: white;
        border-radius: 50px;
    }
    &__overlay {
        width: 32px!important;
        height: 15px!important;
        display: inline-block!important;
    }
}
.toggle.active.text-danger {
    .toggle__icon {
        right: 2px;
        left: auto !important;
        background-image: url('../../src/assets/icons/check.svg');;
        background-repeat: no-repeat;
        background-position: center;
    }
    .toggle__indicator {
        background:red
    }
}
</style>
