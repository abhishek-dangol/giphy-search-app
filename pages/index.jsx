import Head from 'next/head';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import Footer from '../components/Footer';
import Image from 'next/image';

export default function Home(initialData) {
  const [formInputs, setFormInputs] = useState()
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('pets')

  useEffect(() => {
      setSearchResults(initialData.catGiphys.data)
  }, [initialData])

  const handleInputs = (e) => {
    let { name, value } = e.target;
    setFormInputs({...formInputs, [name]: value})
  }

  const search = async (e) => {
    e.preventDefault();
    let giphys = await fetch(
      `https://api.giphy.com/v1/gifs/search?q={formInputs.searchTerm}&api_key=z7VPExeiLKstC33626F2lZMD2nceySKs&limit=10`
    );
    giphys = await giphys.json();
    setSearchResults(giphys.data);
    setSearchTerm(formInputs.searchTerm);
  }
  return (
    <>
    <div className='container'>
      <Head>
          <title>Giphy Search App</title>
          <meta name="description" content="Love giphys? We do too.
          use our advanced giphy search too find your favorite gifs
          on the internet"/>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="/styles.css" />
      </Head>
      
        <div className="logo-container">
          <Image src="/logo.png" alt="logo" height={400} width={600}/>
      </div>

      <form onSubmit={search}>
        <input name="searchTerm" onChange={handleInputs} type="text"/>
        <button>Search</button>
      </form>

      <h1>Search results for: {searchTerm}</h1>

      <div className="giphy-search-results-grid">
        {searchResults.map((each, index) => {
          return (
            <div key="index">
              <h3>{each.title}</h3>
              <img src={each.images.original.url} alt={each.title} />
            </div>
          )
        })}
      </div>
      </div>
      <Footer />
      </>
  )
}



export async function getServerSideProps() {
  let catGiphys = await fetch(
    "https://api.giphy.com/v1/gifs/search?q=pets&api_key=z7VPExeiLKstC33626F2lZMD2nceySKs&limit=10"
  );
  catGiphys = await catGiphys.json();
  return {
    props: {
      catGiphys: catGiphys
    }
  }
}