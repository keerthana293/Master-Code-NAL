<<<<<<< HEAD
import { useState, useMemo } from "react";

=======
import { useState, useEffect, useMemo } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
>>>>>>> 0378b4b (Default message)
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
<<<<<<< HEAD
import { Search, MapPin, Bed, Bath, Square, Filter, Heart, Share2, ChevronLeft, ChevronRight } from "lucide-react";
import { properties, Property } from "../data/properties";
=======
import { Search, MapPin, Bed, Bath, Square, Filter, Heart, Share2 } from "lucide-react";

interface Property {
  id: number;
  title: string;
  price_formatted: string;
  city: string;
  state: string;
  beds: number;
  baths: number;
  area_sqft: number;
  ribl_rating?: string;
  status: string;
  description: string;
}
>>>>>>> 0378b4b (Default message)
import { PropertyMap } from "./PropertyMap";
import { Link } from "react-router-dom";

export function PropertyListing() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("all");
  const [selectedBHK, setSelectedBHK] = useState("all");
  const [priceRange, setPriceRange] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [currentPropertyIndex, setCurrentPropertyIndex] = useState(0);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await fetch('http://localhost/Master-Code-NAL/api/properties.php');
      const data = await response.json();
      if (data.success) {
        setProperties(data.data);
      }
    } catch (error) {
      console.error('Error fetching properties:', error);
    } finally {
      setLoading(false);
    }
  };

  // Extract unique cities from properties
  const cities = useMemo(() => {
    const citySet = new Set(properties.map(p => p.city));
    return Array.from(citySet);
  }, [properties]);

  // Filter and sort properties
  const filteredProperties = useMemo(() => {
    let filtered = properties.filter(property => {
      const matchesSearch = property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          property.city.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCity = selectedCity === "all" || 
                         property.city.toLowerCase().includes(selectedCity.toLowerCase());
      
      const matchesBHK = selectedBHK === "all" || 
                        property.beds.toString() === selectedBHK;
      
      const matchesPrice = priceRange === "all" || checkPriceRange(property.price_formatted, priceRange);
      
      return matchesSearch && matchesCity && matchesBHK && matchesPrice;
    });

    // Sort properties
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => extractPrice(a.price_formatted) - extractPrice(b.price_formatted));
        break;
      case "price-high":
        filtered.sort((a, b) => extractPrice(b.price_formatted) - extractPrice(a.price_formatted));
        break;
      case "newest":
        filtered.sort((a, b) => b.id - a.id);
        break;
      default:
        break;
    }

    return filtered;
  }, [properties, searchQuery, selectedCity, selectedBHK, priceRange, sortBy]);

  const extractPrice = (priceStr: string): number => {
    const match = priceStr.match(/₹([\d.]+)\s*([LCr])/);
    if (!match) return 0;
    const value = parseFloat(match[1]);
    const unit = match[2];
    return unit === 'Cr' ? value * 10000000 : value * 100000;
  };

  const checkPriceRange = (priceStr: string, range: string): boolean => {
    const price = extractPrice(priceStr);
    switch (range) {
      case "under-50l":
        return price < 5000000;
      case "50l-1cr":
        return price >= 5000000 && price < 10000000;
      case "1cr-2cr":
        return price >= 10000000 && price < 20000000;
      case "above-2cr":
        return price >= 20000000;
      default:
        return true;
    }
  };

  return (
    <div className="bg-gray-50 min-h-full">
      <div className="w-full px-4 sm:px-6 lg:px-8 py-6">
        {/* Search Bar */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search by property name, location, or builder..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-12 text-lg"
            />
          </div>
        </div>

        {/* Filters Bar */}
        <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>
            
            <Select value={selectedCity} onValueChange={setSelectedCity}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cities</SelectItem>
                {cities.map(city => (
                  <SelectItem key={city} value={city}>{city}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedBHK} onValueChange={setSelectedBHK}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="BHK" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All BHK</SelectItem>
                <SelectItem value="1">1 BHK</SelectItem>
                <SelectItem value="2">2 BHK</SelectItem>
                <SelectItem value="3">3 BHK</SelectItem>
                <SelectItem value="4">4 BHK</SelectItem>
              </SelectContent>
            </Select>

            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="under-50l">Under ₹50L</SelectItem>
                <SelectItem value="50l-1cr">₹50L - ₹1Cr</SelectItem>
                <SelectItem value="1cr-2cr">₹1Cr - ₹2Cr</SelectItem>
                <SelectItem value="above-2cr">Above ₹2Cr</SelectItem>
              </SelectContent>
            </Select>

            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort By" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="relevance">Relevance</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>

            <div className="ml-auto text-sm text-gray-600">
              {filteredProperties.length} properties found
            </div>
          </div>
        </div>

<<<<<<< HEAD
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-280px)]">
          {/* Map Section - 50% */}
          <div className="h-full relative sticky top-0">
            <PropertyMap properties={filteredProperties} currentIndex={currentPropertyIndex} />
            
            {/* Property Navigation Arrow */}
            <div className="absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  const nextIndex = (currentPropertyIndex + 1) % filteredProperties.length;
                  setCurrentPropertyIndex(nextIndex);
                }}
                className="h-12 w-8 p-0 bg-white shadow-lg hover:bg-gray-50 rounded-full"
                disabled={filteredProperties.length === 0}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
=======
        {loading ? (
          <div className="text-center py-12">
            <div className="text-gray-400 text-lg">Loading properties...</div>
>>>>>>> 0378b4b (Default message)
          </div>
        ) : (
          /* Main Content */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-280px)]">
            {/* Map Section - Fixed */}
            <div className="h-full">
              <PropertyMap properties={filteredProperties} />
            </div>

<<<<<<< HEAD
          {/* Properties List - 50% */}
          <div className="h-full overflow-y-auto pr-2">
            <div className="space-y-4">
              {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
              
              {filteredProperties.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-lg mb-2">No properties found</div>
                  <div className="text-gray-500">Try adjusting your search criteria</div>
                </div>
              )}
=======
            {/* Properties List - Scrollable */}
            <div className="h-full overflow-y-auto pr-2">
              <div className="space-y-4">
                {filteredProperties.map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
                
                {filteredProperties.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-gray-400 text-lg mb-2">No properties found</div>
                    <div className="text-gray-500">Try adjusting your search criteria</div>
                  </div>
                )}
              </div>
>>>>>>> 0378b4b (Default message)
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function PropertyCard({ property }: { property: Property }) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex">
        <div className="w-64 h-48 relative">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop"
            alt={property.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 left-2 flex gap-1">
            <Badge className="bg-green-600 text-white text-xs">NAL Verified</Badge>
            {property.status === 'Urgent Sale' && (
              <Badge className="bg-red-600 text-white text-xs">Urgent</Badge>
            )}
            <Badge className="bg-blue-600 text-white text-xs">RIBL {property.ribl_rating || ''}</Badge>
          </div>
          <div className="absolute top-2 right-2 flex gap-1">
            <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white">
              <Heart className="w-4 h-4" />
            </Button>
            <Button size="sm" variant="ghost" className="bg-white/80 hover:bg-white">
              <Share2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        <CardContent className="flex-1 p-4">
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                <Link 
                  to={`/property/${property.id}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {property.title}
                </Link>
              </h3>
              <div className="flex items-center text-gray-600 text-sm mb-2">
                <MapPin className="w-4 h-4 mr-1" />
                {property.city}, {property.state}
              </div>
            </div>
            <div className="text-right">
              <div className="text-xl font-bold text-gray-900">{property.price_formatted}</div>
            </div>
          </div>

          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              {property.beds} Beds
            </div>
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-1" />
              {property.baths} Baths
            </div>
            <div className="flex items-center">
              <Square className="w-4 h-4 mr-1" />
              {property.area_sqft.toLocaleString()} sq ft
            </div>
          </div>

          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {property.description}
          </p>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-xs font-medium">
                AG
              </div>
              <div>
                <div className="text-sm font-medium">Agent</div>
                <div className="text-xs text-gray-500">⭐ 4.5</div>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button size="sm" variant="outline">Contact</Button>
              <Link to={`/property/${property.id}`}>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  View Details
                </Button>
              </Link>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
}