function LoadingOverlay({ isLoading }) {
    if(!isLoading) return null;
  
    return (
      <div  style={overlayStyle}>
        <div style={spinnerContainerStyle}/>
        <p>Yükleniyor...</p>
      </div>
    );
  }
  export default LoadingOverlay;
  const overlayStyle = {
    position: 'fixed',
    top: 0, left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999
  };
  
  const spinnerContainerStyle = {
    textAlign: 'center',
    color: '#fff'
  };