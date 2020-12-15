import './App.css';
import ArticlePreviews from "../features/articlePreviews/ArticlePreviews"
import CurrentArticle from "../features/currentArticle/CurrentArticle"
import Comments from "../features/comments/Comments"

function App() {
  return (
    <div className="App">
      <header className="App-header"/>
      <main>
        <ArticlePreviews />
        <div>
          <CurrentArticle />
          <Comments />
        </div>
      </main>
    </div>
  );
}

export default App;
