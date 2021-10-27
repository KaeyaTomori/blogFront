import {
	SAVE_SITE_INFO,
	SAVE_PROFILECARD,
	SET_IS_BLOG_RENDER_COMPLETE,
} from "./mutations-types";


export default {
	saveSiteInfo({commit}, siteInfo) {
		commit(SAVE_SITE_INFO, {siteInfo})
	},
	saveProfileCard({commit}, profileCard) {
		commit(SAVE_PROFILECARD, {profileCard})
	},
	setIsBlogRenderComplete({commit}, ok) {
		commit(SET_IS_BLOG_RENDER_COMPLETE, {ok})
	}
}