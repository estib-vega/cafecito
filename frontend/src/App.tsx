import CafeList from "@/components/cafe/CafeList";

function App() {
  return (
    <>
      <header className="flex p-8">
        <h1 className="text-4xl font-bold">cafecito</h1>
      </header>
      <main>
        <CafeList />
      </main>
    </>
  );
}

export default App;
