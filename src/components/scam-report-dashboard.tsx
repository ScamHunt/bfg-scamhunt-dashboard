'use client'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { Bell, DollarSign, ShieldAlert, Users, User, Settings, LogOut } from "lucide-react"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useEffect } from "react"
import { createClient } from "@/utils/supabase/server"
const data = [
  { name: "Jan", reports: 65 },
  { name: "Feb", reports: 59 },
  { name: "Mar", reports: 80 },
  { name: "Apr", reports: 81 },
  { name: "May", reports: 56 },
  { name: "Jun", reports: 55 },
  { name: "Jul", reports: 40 },
]

export async function ScamReportDashboard() {

  // const [reportCount, setreportCount] = useState<number>(0);

  const getReportCount = async () => {
  const supabase = createClient();
  console.log('supabase', supabase)
  const { data, error } = await supabase
    .from('')
    .select('*',{count: 'exact'})
    // setreportCount(data ? data.length : 0)
    console.log(data)
    console.error(error)
  return data
  }
  const res = await getReportCount()
    console.log('res', res)
  
    useEffect(() => {
      console.log('rendered')
    }, [])

  return (
    <div className={`min-h-screen `}>
      <div className="bg-off-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
        <nav className="border-b border-gray-200 dark:border-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex">
                <div className="flex-shrink-0 flex items-center">
                  <ShieldAlert className="h-8 w-8 text-neon-green dark:text-green-400" />
                  <span className="ml-2 text-2xl font-bold">ScamHuunt</span>
                </div>
              </div>
              <div className="flex items-center">
           
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <User className="h-5 w-5" />
                      <span className="sr-only">Open user menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </nav>
        <div className="p-8">
          <h1 className="text-3xl font-bold mb-8">Scam Report Dashboard</h1>
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
                    <ShieldAlert className="h-4 w-4 text-neon-green dark:text-green-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold"></div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">+12.5% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                    <Users className="h-4 w-4 text-neon-green dark:text-green-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">15,423</div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">+7.2% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Reported Amount</CardTitle>
                    <DollarSign className="h-4 w-4 text-neon-green dark:text-green-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$1,234,567</div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">+22.5% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Alerts Sent</CardTitle>
                    <Bell className="h-4 w-4 text-neon-green dark:text-green-400" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">1,543</div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">+4.3% from last month</p>
                  </CardContent>
                </Card>
              </div>
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Scam Reports</CardTitle>
                </CardHeader>
                <CardContent className="pl-2">
                  <ResponsiveContainer width="100%" height={350}>
                    <BarChart data={data}>
                      <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                      <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `${value}`} />
                      <Bar dataKey="reports" fill={"#22c55e"} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}