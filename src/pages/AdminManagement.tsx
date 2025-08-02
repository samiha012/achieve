import { useState, useEffect } from 'react';
import { HiTrash, HiPencil, HiPlus } from 'react-icons/hi';
import LoaderOverlay from '../components/LoaderOverlay';
import ConfirmModal from '../components/ConfirmModal';

interface Admin {
  _id: string;
  email: string;
  password: string;
  branch: string;
  role: 'admin';
  createdAt: string;
}

interface Branch {
  id: string;
  text: string;
  address: string;
  email?: string;
  phone?: string;
  photo?: string;
  gmap?: string;
}

interface BranchResponse {
  status: number;
  branchList: Branch[];
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
      const res = await fetch(`${import.meta.env.VITE_CRM_URL}/branch/all-branches`);
      const data = await res.json();
      setBranches(data.branchList)
    } catch (error) {
      setError('Failed to fetch branches');
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (!form.email || !form.branch || (!editingAdmin && !form.password)) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    try {
      const url = editingAdmin
        ? `${import.meta.env.VITE_API_URL}/api/admin/${editingAdmin._id}`
        : `${import.meta.env.VITE_API_URL}/api/admin/create`;

      const method = editingAdmin ? 'PUT' : 'POST';

      // Only include password in payload if it's provided (for editing)
      const payload = {
        email: form.email,
        branch: form.branch,
        ...(form.password && { password: form.password })
      };

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to save admin');
      }

      await fetchAdmins(); // Refetch the updated list
      setForm({ email: '', password: '', branch: '' });
      setEditingAdmin(null);

      // Show success message (assuming you have a toast function)
      // toast({
      //   title: `Admin ${editingAdmin ? 'updated' : 'created'} successfully`,
      //   type: 'success'
      // });

    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to save admin';
      setError(message);
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
              {branches && branches.map(branch => (
                <option key={branch.id} value={branch.id}>
                  {branch.text} - {branch.address}
                </option>
              ))}
            </select>
            <div className="flex gap-2">
              <button
                type="submit"
                disabled={loading}
                className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed flex items-center gap-2`}
              >
                {loading ? (
                  <>
                    <LoaderOverlay />
                    {editingAdmin ? 'Updating...' : 'Creating...'}
                  </>
                ) : (
                  editingAdmin ? 'Update' : 'Create'
                )}
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
                    Branch: {
                      branches.find(b => b.id === admin.branch)?.text || 'Unknown'
                    }
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditingAdmin(admin);
                      setForm({
                        email: admin.email,
                        password: '',
                        branch: admin.branch
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