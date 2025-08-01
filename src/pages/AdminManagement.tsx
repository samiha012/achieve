import { useState, useEffect } from 'react';
import { HiTrash, HiPencil, HiPlus } from 'react-icons/hi';
import LoaderOverlay from '../components/LoaderOverlay';
import ConfirmModal from '../components/ConfirmModal';

interface Admin {
  _id: string;
  email: string;
  branch: Branch;
  role: string;
  createdAt: string;
}

interface Branch {
  _id: string;
  name: string;
  address: string;
  phone?: string;
  email?: string;
}

const AdminManagement = () => {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [form, setForm] = useState({
    email: '',
    password: '',
    branch: ''
  });

  useEffect(() => {
    fetchAdmins();
    fetchBranches();
  }, []);

  const fetchAdmins = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/admin`, {
        credentials: 'include'
      });
      const data = await res.json();
      setAdmins(data);
    } catch (error) {
      setError('Failed to fetch admins');
    } finally {
      setLoading(false);
    }
  };

  const fetchBranches = async () => {
    try {
      setLoading(true);
      const formData = new URLSearchParams();

      // DataTables required parameters
      formData.append('draw', '1');
      formData.append('start', '0');
      formData.append('length', '100'); // Fetch all branches for admin selection

      // Column definitions
      const columnNames = [
        'name', 'photo', 'address', 'phone', 'email',
        'coach', 'tagline', 'instruction', 'gmap', 'updated', 'created', 'status'
      ];

      columnNames.forEach((col, index) => {
        formData.append(`columns[${index}][data]`, col);
        formData.append(`columns[${index}][name]`, '');
        formData.append(`columns[${index}][searchable]`, 'true');
        formData.append(`columns[${index}][orderable]`, 'true');
        formData.append(`columns[${index}][search][value]`, '');
        formData.append(`columns[${index}][search][regex]`, 'false');
      });

       const response = await fetch('/.netlify/functions/proxy/branch/all', {
      //const response = await fetch(`${import.meta.env.VITE_CRM_URL}/branch/all?uid=GbpNqKDUQqU5ZHo3qyEs2EvbtL32`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData.toString(),
      });

      if (!response.ok) throw new Error('Failed to fetch branches');

      const data = await response.json();
      setBranches(data.data || []);
    } catch (err: any) {
      setError(err.message || 'Error fetching branches');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const url = editingAdmin 
        ? `${import.meta.env.VITE_API_URL}/api/admin/${editingAdmin._id}`
        : `${import.meta.env.VITE_API_URL}/api/admin/create`;
      
      const method = editingAdmin ? 'PUT' : 'POST';
      
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(form)
      });

      fetchAdmins();
      setForm({ email: '', password: '', branch: '' });
      setEditingAdmin(null);
    } catch (error) {
      setError('Failed to save admin');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      await fetch(`${import.meta.env.VITE_API_URL}/api/admin/${id}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      fetchAdmins();
    } catch (error) {
      setError('Failed to delete admin');
    } finally {
      setLoading(false);
      setShowDeleteModal(false);
      setDeleteTarget(null);
    }
  };

  return (
    <div className="container mx-auto p-6">
      {loading && <LoaderOverlay />}
      
      <ConfirmModal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
          setDeleteTarget(null);
        }}
        onConfirm={() => deleteTarget && handleDelete(deleteTarget)}
        message="Are you sure you want to delete this admin?"
      />

      <div className="grid md:grid-cols-2 gap-6">
        {/* Admin Form */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            {editingAdmin ? 'Edit Admin' : 'Create New Admin'}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full p-2 border rounded"
              required={!editingAdmin}
            />
             <select
              value={form.branch}
              onChange={(e) => setForm({ ...form, branch: e.target.value })}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Branch</option>
              {branches.map(branch => (
                <option key={branch._id} value={branch._id}>
                  {branch.name} - {branch.address}
                </option>
              ))}
            </select>
            <div className="flex gap-2">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                {editingAdmin ? 'Update' : 'Create'}
              </button>
              {editingAdmin && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingAdmin(null);
                    setForm({ email: '', password: '', branch: '' });
                  }}
                  className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Admins List */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Branch Admins</h2>
          {error && <div className="text-red-500 mb-4">{error}</div>}
          <div className="space-y-4">
            {admins.map(admin => (
              <div 
                key={admin._id} 
                className="border p-4 rounded flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">{admin.email}</p>
                  <p className="text-sm text-gray-500">
                    Branch: {admin.branch?.name}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingAdmin(admin);
                      setForm({
                        email: admin.email,
                        password: '',
                        branch: admin.branch._id
                      });
                    }}
                    className="p-2 text-yellow-600 hover:text-yellow-700"
                  >
                    <HiPencil />
                  </button>
                  <button
                    onClick={() => {
                      setDeleteTarget(admin._id);
                      setShowDeleteModal(true);
                    }}
                    className="p-2 text-red-600 hover:text-red-700"
                  >
                    <HiTrash />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminManagement;