import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/walkthrough",
    pathMatch: "full",
  },
  {
    path: "walkthrough",
    loadChildren: () =>
      import("./walkthrough/walkthrough.module").then(
        (m) => m.WalkthroughPageModule
      ),
  },
  {
    path: "getting-started",
    loadChildren: () =>
      import("./getting-started/getting-started.module").then(
        (m) => m.GettingStartedPageModule
      ),
  },
  {
    path: "auth",
    redirectTo: "auth/login",
    pathMatch: "full",
  },
  {
    path: "auth/login",
    loadChildren: () =>
      import("./login/login.module").then((m) => m.LoginPageModule),
  },
  {
    path: "auth/signup",
    loadChildren: () =>
      import("./signup/signup.module").then((m) => m.SignupPageModule),
  },
  {
    path: "auth/forgot-password",
    loadChildren: () =>
      import("./forgot-password/forgot-password.module").then(
        (m) => m.ForgotPasswordPageModule
      ),
  },
  {
    path: "app",
    loadChildren: () =>
      import("./tabs/tabs.module").then((m) => m.TabsPageModule),
  },
  {
    path: "contact-card",
    loadChildren: () =>
      import("./contact-card/contact-card.module").then(
        (m) => m.ContactCardPageModule
      ),
  },
  {
    path: "forms-and-validations",
    loadChildren: () =>
      import("./forms/validations/forms-validations.module").then(
        (m) => m.FormsValidationsPageModule
      ),
  },
  {
    path: "forms-filters",
    loadChildren: () =>
      import("./forms/filters/forms-filters.module").then(
        (m) => m.FormsFiltersPageModule
      ),
  },
  {
    path: "page-not-found",
    loadChildren: () =>
      import("./page-not-found/page-not-found.module").then(
        (m) => m.PageNotFoundModule
      ),
  },
  {
    path: "showcase",
    loadChildren: () =>
      import("./showcase/showcase.module").then((m) => m.ShowcasePageModule),
  },
  {
    path: "firebase",
    redirectTo: "firebase/auth/sign-in",
    pathMatch: "full",
  },
  {
    path: "firebase/auth",
    loadChildren: () =>
      import("./firebase/auth/firebase-auth.module").then(
        (m) => m.FirebaseAuthModule
      ),
  },
  {
    path: "firebase/crud",
    loadChildren: () =>
      import("./firebase/crud/firebase-crud.module").then(
        (m) => m.FirebaseCrudModule
      ),
  },
  {
    path: "maps",
    loadChildren: () =>
      import("./maps/maps.module").then((m) => m.MapsPageModule),
  },
  {
    path: "video-playlist",
    loadChildren: () =>
      import("./video-playlist/video-playlist.module").then(
        (m) => m.VideoPlaylistPageModule
      ),
  },

  {
    path: "posts",
    loadChildren: () =>
      import("./pages/posts/posts.module").then((m) => m.PostsPageModule),
  },

  {
    path: "posts/:id",
    loadChildren: () =>
      import("./pages/post/post.module").then((m) => m.PostPageModule),
  },
  {
    path: "donate",
    loadChildren: () =>
      import("./donate/donate.module").then((m) => m.DonatePageModule),
  },
  {
    path: "donation-list",
    loadChildren: () =>
      import("./donation-list/donation-list.module").then(
        (m) => m.DonationListPageModule
      ),
  },
  {
    path: "edit-profile",
    loadChildren: () =>
      import("./edit-profile/edit-profile.module").then(
        (m) => m.EditProfilePageModule
      ),
  },
  {
    path: "contact-us",
    loadChildren: () =>
      import("./contact-us/contact-us.module").then(
        (m) => m.ContactUsPageModule
      ),
  },
 
  {
    path: 'contact-us',
    loadChildren: () => import('./contact-us/contact-us.module').then( m => m.ContactUsPageModule)
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      // This value is required for server-side rendering to work.
      initialNavigation: "enabled",
      scrollPositionRestoration: "enabled",
      anchorScrolling: "enabled",
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}


