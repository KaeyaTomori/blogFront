<template>
    <div>
        <div class="item">
          <ProfileCard />
        </div>
        <div class="item">
          <Categorys />
        </div>
        <div class="item">
          <!-- <Tags /> -->
        </div>
        <div class="item">
          <FriendsLink />
        </div>
    </div>
</template>

<script>
import FriendsLink from './FriendsLink'
import ProfileCard from './ProfileCard'
import Categorys from './Categorys'
// import Tags from './Tags'
export default {
    components:{
        FriendsLink,
        ProfileCard,
        Categorys,
        // Tags
    }

}
</script>

<style>

</style>