import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import Layout from "@/components/organisms/Layout"
import TasksPage from "@/components/pages/TasksPage"

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50">
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<TasksPage />} />
            <Route path="category/:categoryId" element={<TasksPage />} />
            <Route path="priority/:priority" element={<TasksPage />} />
            <Route path="overdue" element={<TasksPage />} />
            <Route path="today" element={<TasksPage />} />
            <Route path="upcoming" element={<TasksPage />} />
            <Route path="completed" element={<TasksPage />} />
          </Route>
        </Routes>
        
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          className="mt-16"
          toastClassName="rounded-xl shadow-lg"
          style={{ zIndex: 9999 }}
        />
      </div>
    </BrowserRouter>
  )
}

export default App