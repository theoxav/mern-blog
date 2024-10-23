import { Button, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import PostService from "../../services/api/post.api";
import PostCardItem from "../../components/Posts/PostCardItem";
import Loading from "../../components/UI/Loaders/Loading";

export default function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [sidebarData, setSidebarData] = useState({
    searchTerm: "",
    sort: "desc",
    category: "uncategorized",
  });
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const sortFromUrl = urlParams.get("sort");
    const categoryFromUrl = urlParams.get("category");

    if (searchTermFromUrl || sortFromUrl || categoryFromUrl) {
      setSidebarData({
        ...sidebarData,
        searchTerm: searchTermFromUrl,
        sort: sortFromUrl,
        category: categoryFromUrl,
      });
    }
    const fetchPosts = async () => {
      setIsLoading(true);

      try {
        const params = {
          searchTerm: searchTermFromUrl,
          sort: sortFromUrl,
        };

        if (categoryFromUrl && categoryFromUrl !== "uncategorized") {
          params.category = categoryFromUrl;
        }

        const data = await PostService.getPosts(params);

        setPosts(data.posts);

        if (data.posts.length === 9) {
          setShowMore(true);
        } else {
          setShowMore(false);
        }
      } catch (error) {
        console.error("Error fetching posts: ", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebarData, searchTerm: e.target.value });
    }

    if (e.target.id === "sort") {
      const order = e.target.value || "desc";
      setSidebarData({ ...sidebarData, sort: order });
    }

    if (e.target.id === "category") {
      const category = e.target.value || "uncategorized";
      setSidebarData({ ...sidebarData, category: category });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();

    urlParams.set("searchTerm", sidebarData.searchTerm);
    urlParams.set("sort", sidebarData.sort);
    urlParams.set("category", sidebarData.category);

    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const handleShowMore = async () => {
    const startIndex = posts.length;
    const urlParams = new URLSearchParams();
    urlParams.set("startIndex", startIndex);

    const params = {
      searchTerm: sidebarData.searchTerm,
      sort: sidebarData.sort,
      startIndex: startIndex,
    };

    if (sidebarData.category && sidebarData.category !== "uncategorized") {
      params.category = sidebarData.category;
    }

    try {
      const data = await PostService.getPosts(params);
      setPosts((prevPosts) => [...prevPosts, ...data.posts]);
      if (data.posts.length === 9) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
    } catch (error) {
      console.error("Error fetching more posts: ", error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="p-7 border-b md:border-r md:min-h-screen border-gray-500">
        <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <TextInput
              placeholder="Search..."
              id="searchTerm"
              type="text"
              value={sidebarData.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Sort:</label>
            <Select onChange={handleChange} value={sidebarData.sort} id="sort">
              <option value="desc">Latest</option>
              <option value="asc">Oldest</option>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold">Category:</label>
            <Select
              onChange={handleChange}
              value={sidebarData.category}
              id="category"
            >
              <option value="uncategorized">Select Category</option>
              <option value="javascript">JavaScript</option>
              <option value="node.js">Node.js</option>
              <option value="typeScript">TypeScript</option>
              <option value="react.js">React.js</option>
              <option value="next.js">Next.js</option>
              <option value="apis">APIs</option>
              <option value="css">CSS</option>
              <option value="coding">Coding</option>
            </Select>
          </div>
          <Button type="submit" outline gradientDuoTone="purpleToPink">
            Apply filters
          </Button>
        </form>
      </div>
      <div className="w-full">
        <h1 className="text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5">
          Posts results:
        </h1>
        <div className="p-7 flex flex-wrap gap-4">
          {isLoading && <Loading />}
          {posts && posts.length > 0 ? (
            posts.map((post, index) => (
              <PostCardItem key={`${post._id}-${index}`} post={post} />
            ))
          ) : (
            <p className="text-xl text-gray-500">No results found.</p>
          )}

          {showMore && (
            <button
              onClick={handleShowMore}
              className="text-teal-500 text-lg hover:underline p-7 w-full"
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
