import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { 
  Home, Building, Calendar, MessageCircle, FileText, 
  Shield, TrendingUp, BarChart3, Settings, Bell,
  Star, IndianRupee, Eye
} from "lucide-react";

export function AgentDashboard() {
  const [agentName, setAgentName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("agentLoggedIn");
    const name = localStorage.getItem("agentName");
    
    if (!isLoggedIn) {
      navigate("/agent");
      return;
    }
    
    setAgentName(name || "Agent");
  }, [navigate]);

  const sidebarItems = [
    { icon: Home, label: "Dashboard", active: true },
    { icon: Building, label: "Properties" },
    { icon: Calendar, label: "Site Visits" },
    { icon: MessageCircle, label: "Messages" },
    { icon: FileText, label: "Document Tracker" },
    { icon: Shield, label: "Digital Vault" },
    { icon: TrendingUp, label: "Analytics & Reports" },
    { icon: BarChart3, label: "Commissions" },
    { icon: Settings, label: "Settings" }
  ];

  const handleLogout = () => {
    localStorage.removeItem("agentLoggedIn");
    localStorage.removeItem("agentName");
    navigate("/agent");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-sm border-r">
        <div className="p-6">
          <h1 className="text-xl font-bold text-gray-900">Agent Dashboard</h1>
          <p className="text-sm text-gray-600">Real Estate Management</p>
        </div>
        
        <nav className="px-4 space-y-2">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                item.active 
                  ? "bg-[#3B4CB8] text-white" 
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Header */}
        <header className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">Agent Dashboard</h2>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-4 h-4" />
                <Badge className="bg-red-500 text-white ml-1">1</Badge>
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-[#3B4CB8] rounded-full flex items-center justify-center text-white font-semibold">
                  S
                </div>
                <div>
                  <p className="font-medium">{agentName}</p>
                  <p className="text-sm text-gray-600">Agent</p>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Welcome Section */}
          <div className="bg-gradient-to-r from-[#3B4CB8] to-[#5B6BC8] rounded-lg p-6 text-white mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                  <Star className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">Welcome back, {agentName}!</h3>
                  <p className="text-white/80">Here's what's happening with your properties today</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Card className="bg-green-500 text-white border-0">
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <IndianRupee className="w-4 h-4" />
                      <span className="text-2xl font-bold">5,000</span>
                    </div>
                    <p className="text-sm">Total Earnings</p>
                  </CardContent>
                </Card>
                <Card className="bg-blue-500 text-white border-0">
                  <CardContent className="p-4 text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Building className="w-4 h-4" />
                      <span className="text-2xl font-bold">3</span>
                    </div>
                    <p className="text-sm">Properties</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>

          {/* Performance Statistics */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-xl font-semibold">Performance Statistics</h4>
              <Button variant="ghost" size="sm">
                <Eye className="w-4 h-4 mr-2" />
                Hide
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="bg-purple-50 border-purple-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium text-purple-600">Total Properties</p>
                      <p className="text-3xl font-bold text-purple-900">3</p>
                      <p className="text-sm text-purple-600">+0 from last month</p>
                    </div>
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <Building className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium text-green-600">Available Properties</p>
                      <p className="text-3xl font-bold text-green-900">1</p>
                      <p className="text-sm text-green-600">+0 from last month</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Home className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-blue-50 border-blue-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium text-blue-600">Sold Properties</p>
                      <p className="text-3xl font-bold text-blue-900">1</p>
                      <p className="text-sm text-blue-600">+0 from last month</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Building className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-yellow-50 border-yellow-200">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm font-medium text-yellow-600">Pending Properties</p>
                      <p className="text-3xl font-bold text-yellow-900">1</p>
                      <p className="text-sm text-yellow-600">+0 from last month</p>
                    </div>
                    <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-yellow-600" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}