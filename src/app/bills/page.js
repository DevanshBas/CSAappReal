export default function BillsPage() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1 style={{ 
        fontSize: '2rem', 
        fontWeight: 'bold', 
        marginBottom: '1rem',
        color: 'var(--text-primary)'
      }}>
        Bills Page
      </h1>
      <p style={{ 
        fontSize: '1.125rem',
        color: 'var(--text-secondary)',
        marginBottom: '2rem'
      }}>
        This is the bills page. It's working correctly!
      </p>
      
      <div style={{
        background: 'var(--card)',
        padding: '1.5rem',
        borderRadius: '8px',
        border: '1px solid var(--border)'
      }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          fontWeight: '600', 
          marginBottom: '1rem',
          color: 'var(--text-primary)'
        }}>
          Sample Bill
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          This is where your bills will be displayed once Firebase is properly configured.
        </p>
      </div>
    </div>
  );
}
