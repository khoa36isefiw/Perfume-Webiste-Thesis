const headerData = [
    { headerText: 'Home', headerLink: '/' },
    { headerText: 'Shop', headerLink: '/shop' },
    { headerText: 'About Us', headerLink: '/about-us' },
    { headerText: 'Services', headerLink: '/our-services' },
    { headerText: 'Blog', headerLink: '/blog' },
];

function NewHeader() {
    const navigate = useNavigate();
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState('');

    const [filter, setFilter] = useState('');

    const [anchorEl, setAnchorEl] = useState(null);
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    const [isMobile, setIsMobile] = useState(window.innerWidth < 739);

    const [activeHeader, setActiveHeader] = useState('Home');
    const listSuggestions = suggestions.slice(0, 4); // just show 4 product items to UI

    // get product in cart
    const productListInCart = useSelector((state) => state.cartManagement.productInfor);
    const isLogged = useSelector((state) => state.accountManagement.loggedInAccount);
    const userData = JSON.parse(localStorage.getItem('user_data'));

    function handleWindowSizeChange() {
        setIsMobile(window.innerWidth < 739);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        };
    }, []);

    useEffect(() => {
        const currentPath = location.pathname;
        const currentHeader = headerData.find((header) => header.headerLink === currentPath);
        setActiveHeader(currentHeader ? currentHeader.headerText : 'Home');
    }, [location.pathname]);

    const handleHeaderClick = (header) => {
        setActiveHeader(header.headerText);
        navigate(header.headerLink);
        backTop();
    };

    // search
    const handleSearchChange = (e) => {
        const value = e.target.value;

        setSearchQuery(value);

        if (value) {
            const filteredSuggestions = perfumeData.filter((product) =>
                product.perfumeName.toLowerCase().includes(value.toLowerCase()),
            );
            setShowSuggestions(true);
            setSuggestions(filteredSuggestions);
        } else {
            setShowSuggestions(false);
        }
    };

    // handle selecting a suggestion
    const handleSuggestionClick = (perfume) => {
        // hide the suggestions after selection
        setShowSuggestions(false);
        // navigate to product details page
        navigate(`/product/${perfume.perfumeID}`, { state: { perfume } });
    };

    // Parse URL parameters on mount to set initial searchQuery and filter values
    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const q = searchParams.get('q') || '';
        const filterParam = searchParams.get('filter') || '';
        setSearchQuery(q);
        setFilter(filterParam);

        // If there are initial parameters, trigger the search
        if (q || filterParam) {
            handleSearch(q, filterParam);
        }
    }, [location.search]);

    // Function to handle searching
    const handleSearch = async (search = searchQuery, filterVal = filter) => {
        // Update URL with search query and filter
        const params = new URLSearchParams();
        if (search) params.append('q', search);
        if (filterVal) params.append('filter', filterVal);

        // Navigate to update the URL with query params
        navigate(`/shop?${params.toString()}`);

        // waiting for getting data
        // try {
        //     const response = await axios.get('/api/products', {
        //         params: {
        //             q: search,
        //             filter: filterVal,
        //         },
        //     });
        //     setResults(response.data); // handle results from API
        // } catch (error) {
        //     console.error('Error fetching data:', error);
        // }
    };

    return (
        <Box
            sx={{
                minHeight: '120px',
                width: '100%',
                position: 'fixed',
                backgroundColor: 'black',
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                [tabletScreen]: {
                    minHeight: '80px',
                },
                [mobileScreen]: {
                    width: '100%',
                    minHeight: '100px',
                },
            }}
        >
            <Container>
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <CustomizeTypography
                        sx={{
                            mb: 0,
                            fontSize: '32px',
                            fontWeight: 'bold',
                            background: `linear-gradient(120deg, ${theme.palette.text.main}, ${theme.palette.text.secondary})`,
                            // chỉ hiển thị màu nền ở phần text
                            WebkitBackgroundClip: 'text',
                            // ẩn màu văn bản mặc định
                            WebkitTextFillColor: 'transparent',
                            [ipadProScreen]: {
                                fontSize: '26px',
                            },
                            [tabletScreen]: {
                                fontSize: '22px',
                                width: 120,
                                mt: 1,
                            },
                            [mobileScreen]: {
                                fontSize: '20px',
                            },
                            cursor: 'pointer',
                        }}
                        onClick={() => navigate('/')}
                    >
                        Tomtoc Perfumes
                    </CustomizeTypography>
                </Box>

                <Box
                    sx={{
                        mt: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        // [mobileScreen]: {
                        //     overflowX: 'scroll',
                        // },
                    }}
                >
                    {headerData.map((header, index) => (
                        <CustomizeTypography
                            key={index}
                            onClick={() => handleHeaderClick(header)}
                            sx={{
                                fontSize: '16px',
                                color:
                                    activeHeader === header.headerText
                                        ? theme.palette.text.secondary
                                        : 'white',
                                margin: '0 32px',
                                fontWeight: activeHeader === header.headerText ? 'bold' : 'normal',
                                borderBottom:
                                    activeHeader === header.headerText
                                        ? `1px solid ${theme.palette.text.secondary}`
                                        : '1px solid transparent',
                                transition:
                                    'color 0.3s ease, font-weight 0.3s ease, border-bottom 0.3s ease',
                                '&:hover': {
                                    cursor: 'pointer',
                                    fontWeight: 'bold',
                                },

                                // for mobile
                                [mobileScreen]: {
                                    fontSize: '14px',
                                    margin: '0 13px',
                                },
                            }}
                        >
                            {header.headerText}
                        </CustomizeTypography>
                    ))}
                </Box>

                {isMobile && (
                    <Box
                        sx={{
                            width: '100%',
                            position: 'fixed',
                            backgroundColor: 'black',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            zIndex: 1000,
                        }}
                    >
                        <MobileBottomNavigation />
                    </Box>
                )}
            </Container>
        </Box>
    );
}

export default NewHeader;
