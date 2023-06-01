import Head from "next/head";
import Navbar from "../components/Navbar";
import Main from "../components/Main";
import Projects from "../components/Projects";
import Footer from "../components/Footer";

export const getStaticProps = async () => {
  const res = await fetch("https://api.github.com/users/rjb1116/repos");
  const data = await res.json();

  return {
    props: { repos: data },
  };
};

const Home = ({ repos }) => {
  return (
    <div>
      <Head>
        <title>Reuben's Personal Website</title>
      </Head>

      <Navbar />

      <Main />

      <Projects repos={repos} />

      <Footer />
    </div>
  );
};

export default Home;
