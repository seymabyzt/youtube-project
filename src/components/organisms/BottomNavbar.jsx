import React from 'react';
import { StyleLinkBottom, NavbarBottomFlex } from './styled';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const categories = [
  "Tümü",
  "Pembe Diziler",
  "Müzik",
  "Sitcom'lar",
  "Oyun",
  "Mix'ler",
  "Canlı",
  "Haberler",
  "Matematik",
  "Yemek Pişirme",
  "Animasyon",
  "Aksiyon-Macera Oyunları",
  "Fitness",
  "Son Yüklenenler",
  "İzlenenler",
  "Yeni Öneriler"
];

const BottomNavbar = () => {
  const dispatch = useDispatch();

  const handleCategoryClick = (cat) => {
    if (cat === "Tümü") {
      dispatch(setSearchQuery("")); 
    } else if (cat === "Mix'ler") {
      dispatch(setSearchQuery("mix"));
    } else if (cat === "Aksiyon-Macera Oyunları") {
      dispatch(setSearchQuery("aksiyon macera oyunları"));
    } else {
      dispatch(setSearchQuery(cat));
    }

    navigate("/");
  };
  return (
    <NavbarBottomFlex>
      {categories.map((cat, i) => (
        <StyleLinkBottom
        key={i}
        onClick={(e) => {
          handleCategoryClick(cat);
          navigate("/");
        }}
      >
        {cat}
        </StyleLinkBottom>
      ))}
    </NavbarBottomFlex>
  );
};

export default BottomNavbar;