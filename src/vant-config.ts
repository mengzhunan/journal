import {
    Button,
    Collapse,
    CollapseItem,
    Empty,
    Form, 
    Field, 
    CellGroup,
    Tabbar,
    TabbarItem,
    Image as VanImage,
    Lazyload,
    List,
    NavBar,
    Grid,
    GridItem,
    Search,
    showToast,
    Sticky,
    Skeleton,
    SkeletonTitle,
    SkeletonImage,
    SkeletonAvatar,
    SkeletonParagraph,
    Sidebar,
    SidebarItem,
    Swipe,
    SwipeItem,
    Tab,
    Tabs,
    TextEllipsis,
} from 'vant';

export default {
    install(Vue: any) {
        Vue.use(Button);
        Vue.use(Collapse);
        Vue.use(CollapseItem);
        Vue.use(Empty);
        Vue.use(Form);
        Vue.use(Field);
        Vue.use(CellGroup);
        Vue.use(Tabbar);
        Vue.use(TabbarItem);
        Vue.use(Lazyload);
        Vue.use(List);
        Vue.use(NavBar);
        Vue.use(Grid);
        Vue.use(GridItem);
        Vue.use(Search);
        Vue.use(showToast);
        Vue.use(Sticky);
        Vue.use(Skeleton);
        Vue.use(SkeletonTitle);
        Vue.use(SkeletonImage);
        Vue.use(SkeletonAvatar);
        Vue.use(SkeletonParagraph);
        Vue.use(Sidebar);
        Vue.use(SidebarItem);
        Vue.use(Swipe);
        Vue.use(SwipeItem);
        Vue.use(Tab);
        Vue.use(Tabs);
        Vue.use(TextEllipsis);
        Vue.use(VanImage);
    }
}