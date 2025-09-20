import { ReactNode, useState } from "react";

interface UrgentHelpModalProps {
  children: ReactNode;
}

function UrgentHelpModal({ children }: UrgentHelpModalProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <div onClick={() => setOpen(true)}>
        {children}
      </div>
      {open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg max-w-sm w-full">
            <h2 className="text-lg font-semibold mb-2">Need Urgent Help?</h2>
            <p className="mb-4 text-sm text-gray-600">
              Please contact your nearest support service or call a crisis helpline immediately.
            </p>
            <button 
              onClick={() => setOpen(false)} 
              className="px-4 py-2 bg-red-600 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default UrgentHelpModal;
