import {
	SAVE_SITE_INFO,
	SAVE_PROFILECARD,
	SET_IS_BLOG_RENDER_COMPLETE
} from "./mutations-types";

export default {
	[SAVE_SITE_INFO](state, {siteInfo}) {
		state.siteInfo = siteInfo
	},
	[SAVE_PROFILECARD](state, {profileCard}) {
		state.profileCard = profileCard
	},
	[SET_IS_BLOG_RENDER_COMPLETE](state, {ok}) {
		state.isBlogRenderComplete = ok
	}
}