import { Suspense } from "react";
import AppRoutes from "./routes";

const App = () => {
    return (
        <Suspense fallback={() => <h1>Loading...</h1>}>
            {/* <Model /> */}
            <AppRoutes />
        </Suspense>
    );
}

export default App;
