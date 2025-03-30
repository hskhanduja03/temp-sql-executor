import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import Layout from "./components/Layout";
import { QueryHistoryProvider } from "./Context/QueryHistoryContext";
import { QueryLibraryProvider } from "./Context/QueryLibraryContext";
import QueryEditor from "./components/QueryEditor";
import Dashboard from "./pages/Dashboard";
import "./styles/global.css"
// ✅ Lazy-loading only components not needed on initial page
const QueryTable = lazy(() => import("./components/QueryTable"));
const PreviewTable = lazy(() => import("./components/PreviewTable"));
const QueryHistory = lazy(() => import("./components/QueryHistory"));
const QueryLibrary = lazy(() => import("./components/QueryLibrary"));

function App() {
  return (
    <QueryHistoryProvider>
      <QueryLibraryProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route
                index
                element={
                    <Dashboard Component={<QueryEditor />} />
                }
              />
              <Route
                path="/preview"
                element={
                  <Suspense fallback={<div>Loading Preview...</div>}>
                    <Dashboard Component={<PreviewTable />} />
                  </Suspense>
                }
              />
              <Route
                path="/library"
                element={
                  <Suspense fallback={<div>Loading Library...</div>}>
                    <Dashboard Component={<QueryLibrary />} />
                  </Suspense>
                }
              />
              <Route path="/settings" element="This is settings under Dev." />
              <Route path="/profile" element="This is Profile under Dev." />
              <Route
                path="/history"
                element={
                  <Suspense fallback={<div>Loading History...</div>}>
                    <QueryHistory />
                  </Suspense>
                }
              />
            </Route>
          </Routes>
        </Router>
      </QueryLibraryProvider>
    </QueryHistoryProvider>
  );
}

export default App;
