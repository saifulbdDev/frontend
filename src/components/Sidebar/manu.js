
import popular from '@/assets/img/popular.png';
import flashsales from '@/assets/img/flash-sales.png';
import hygiene from '@/assets/img/hygiene.png';
import summercollection from '@/assets/img/summer-collection.png';
import babycare from '@/assets/img/baby-care.png';
export default {
    items: [
        { heading: 'Offers' },
           { heading: 'Food Aid' },
           { divider: true },
     { title: 'Popular', icon:popular, link: '/popular' },
     { title: 'Hygiene', icon: hygiene, link: '/hygiene' },
     { title: 'Summer Collection', icon: summercollection, link: '/tables' },
     { title: 'Flash Sales', icon: flashsales, link: '/flash-sales' },
    
     {
       title: 'Baby Care',
       icon: babycare,   
       model: false,
       children: [
         { title: 'Newborn Essentials', link: '/newborn-essentials'},
         { title: 'Diapers & Wipes', link: '/diapers-wipes'},
         { title: 'Feeders', link: '/feeders'},
         { title: 'Fooding', link: '/fooding'},
         { title: 'Bath & Skincare', link: '/bath-skincare'},
         { title: 'Baby Accessories', link: '/baby-accessories'},
         { title: 'Baby Oral Care', link: '/baby-oral-care'},
       ],
     },
   
  
   

   ],
}