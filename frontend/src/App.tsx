import CafeList from "@/components/cafe/CafeList";

function App() {
  return (
    <div className="w-screen h-screen flex flex-col fixed">
      <header className="flex p-8 bg-primary-foreground text-primary">
        <h1 className="text-4xl font-bold">cafecito</h1>
      </header>
      <main className="bg-primary-foreground flex-grow">
        <CafeList />
      </main>
    </div>
  );
}

export default App;
