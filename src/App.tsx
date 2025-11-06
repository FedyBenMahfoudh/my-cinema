function App() {

  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy
            Without the Hassle
          </h1>

          {/* Search Bar */}
        </header>


        <section className="all-movies">
          <h2>All Movies</h2>

          {/* Movie List */}

        </section>
      </div>
    </main>
  );
}

export default App;
