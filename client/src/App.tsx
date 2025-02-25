import { Switch, Route } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Software from "@/pages/Software";
import Music from "@/pages/Music";
import GameReviews from "@/pages/GameReviews";
import Blog from "@/pages/Blog";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/software" component={Software} />
        <Route path="/music" component={Music} />
        <Route path="/game-reviews" component={GameReviews} />
        <Route path="/blog" component={Blog} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
