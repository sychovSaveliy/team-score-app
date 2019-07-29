<template>
  <router-link :to="'/user/' + user.id">
    <div class="user__profile" :class="align">
        <div class="user__logo">
          <ProfilePicture :profile-name="user.name" :align="align" type="user" />
        </div>
        <div class="user__info">
          <div class="user__name">
              {{ user.name }}
          </div>
          <div class="user__role">{{ user.role }}</div>
        </div>
    </div>
  </router-link>
</template>

<script>
import ProfilePicture from "@/components/ProfilePicture";
export default {
  name: "UserProfile",
  components: {
    ProfilePicture
  },
  data() {
    return {
    };
  },
  props: {
    user: {
      type: Object,
      default: function() {
        return { name: "" };
      }
    },
    align: { default: "left", type: String }
  }
};
</script>

<style lang="scss" scoped>
.user {
  &__profile {
    color: red;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: rgba(0, 0, 0, 0.87);
    font-size: 12px;
    margin-bottom: 10px;
    &.left {
      .user__info {
        text-align: right;
        margin-right: 10px;
        margin-left: 0;
      }
      .user__logo {
        order: 1;
      }
    }
  }
  &__info {
    flex-grow: 1;
    text-align: left;
    margin-left: 10px;
    margin-right: 0;
  }
  &__logo {
    order: 0;
  }
  &__name {
    font-weight: bold;
  }
}
</style>
