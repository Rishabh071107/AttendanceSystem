import React, { useEffect, useState } from 'react';
import { leaveAPI } from '../services/api';

const ProofSubmission = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState({});
  const [selectedFiles, setSelectedFiles] = useState({});
  const [descriptions, setDescriptions] = useState({});
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await leaveAPI.getMyLeaveRequests();
      setRequests(Array.isArray(data) ? data : []);
      setLoading(false);
    };
    fetch();
  }, []);

  const visibleRequests = requests.filter(r => r.proof_deadline);

  const handleFileChange = (id, file) => {
    setSelectedFiles(prev => ({ ...prev, [id]: file }));
  };

  const handleDescriptionChange = (id, text) => {
    setDescriptions(prev => ({ ...prev, [id]: text }));
  };

  const handleUpload = async (id) => {
    const file = selectedFiles[id];
    if (!file) {
      setMessage('Please select a file to upload');
      return;
    }
    setUploading(prev => ({ ...prev, [id]: true }));
    const res = await leaveAPI.submitProof(id, file, descriptions[id]);
    setUploading(prev => ({ ...prev, [id]: false }));
    if (res && res.message) {
      setMessage(res.message);
      // Refresh list
      const data = await leaveAPI.getMyLeaveRequests();
      setRequests(Array.isArray(data) ? data : []);
    } else {
      setMessage('Upload failed');
    }
  };

  return (
    <div style={{ padding: '2rem', marginLeft: '260px' }}>
      <h2>Proof Submissions</h2>
      {loading && <p>Loading...</p>}
      {!loading && visibleRequests.length === 0 && (
        <p>No proof deadlines assigned yet.</p>
      )}

      {message && <p style={{ color: 'green' }}>{message}</p>}

      {visibleRequests.map(req => {
        const deadline = new Date(req.proof_deadline).toLocaleDateString();
        const now = new Date();
        const expired = req.proof_deadline && now > new Date(req.proof_deadline);
        return (
          <div key={req.id} style={{ border: '1px solid #e5e7eb', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
            <p><strong>Request ID:</strong> {req.id}</p>
            <p><strong>Type:</strong> {req.leave_type}</p>
            <p><strong>From:</strong> {req.from_date} <strong>To:</strong> {req.to_date}</p>
            <p><strong>Proof Deadline:</strong> {deadline} {expired && '(Deadline passed)'}</p>

            {!expired ? (
              <div>
                <input type="file" onChange={e => handleFileChange(req.id, e.target.files[0])} />
                <br />
                <textarea placeholder="Optional description" value={descriptions[req.id] || ''} onChange={e => handleDescriptionChange(req.id, e.target.value)} style={{ width: '100%', marginTop: '0.5rem' }} />
                <button onClick={() => handleUpload(req.id)} disabled={uploading[req.id]} style={{ marginTop: '0.5rem' }}>{uploading[req.id] ? 'Uploading...' : 'Submit Proof'}</button>
              </div>
            ) : (
              <p style={{ color: 'red' }}>Deadline passed. You can no longer submit proof.</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default ProofSubmission;
