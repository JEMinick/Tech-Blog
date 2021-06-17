// const router = require('express').Router();
// const { Project, User } = require('../models');
// const withAuth = require('../utils/auth');

// router.get('/', async (req, res) => {
//   try {
//     // Get all projects and JOIN with user data
//     const projectData = await Project.findAll({
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     // Serialize data so the template can read it
//     const projects = projectData.map((project) => project.get({ plain: true }));

//     // Pass serialized data and session flag into template
//     res.render('homepage', { 
//       projects, 
//       logged_in: req.session.logged_in 
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/project/:id', async (req, res) => {
//   try {
//     const projectData = await Project.findByPk(req.params.id, {
//       include: [
//         {
//           model: User,
//           attributes: ['name'],
//         },
//       ],
//     });

//     const project = projectData.get({ plain: true });

//     res.render('project', {
//       ...project,
//       logged_in: req.session.logged_in
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// // Use withAuth middleware to prevent access to route
// router.get('/profile', withAuth, async (req, res) => {
//   try {
//     // Find the logged in user based on the session ID
//     const userData = await User.findByPk(req.session.user_id, {
//       attributes: { exclude: ['password'] },
//       include: [{ model: Project }],
//     });

//     const user = userData.get({ plain: true });

//     res.render('profile', {
//       ...user,
//       logged_in: true
//     });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get('/login', (req, res) => {
//   // If the user is already logged in, redirect the request to another route
//   if (req.session.logged_in) {
//     res.redirect('/profile');
//     return;
//   }

//   res.render('login');
// });

// module.exports = router;

// =============================================================================================

const sequelize = require('../config/connection');
const { User, BlogPost, BlogComment } = require('../models');
const router = require('express').Router();

// =============================================================================================
router.get('/', (req, res) => {
  BlogPost.findAll({
    attributes: [
      'id',
      'subject',
      'description',
      'date_created'
    ],
    include: [
      {
        model: BlogComment,
        attributes: ['id', 'blog_comment', 'post_id', 'user_id', 'date_created'],
        include: {
          model: User,
          attributes: ['name']
        }
      },
      {
        model: User,
        attributes: ['name']
      }
    ]
  })
  .then(dbBlogPosts => {
    const blogposts = dbBlogPosts.map(subject => subject.get({ plain: true }));
      // console.log( blogposts );
      if ( !req.session.loggedIn )
        req.session.loggedIn = false;
      res.render('homepage', { blogposts, loggedIn: req.session.loggedIn });    })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// =============================================================================================
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// =============================================================================================
// router.get('/signup', (req, res) => {
//   res.render('signup');
// });

// =============================================================================================
router.get('/blogpost/:id', (req, res) => {
  BlogPost.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'subject',
      'description',
      'date_created'
    ],
    include: [
      {
        model: BlogComment,
        attributes: ['id', 'blog_comment', 'post_id', 'user_id', 'date_created'],
        include: {
          model: User,
          attributes: ['name']
        }
      },
      {
        model: User,
        attributes: ['name']
      }
    ]
  })
  .then(blogPostInfo => {
    if (!blogPostInfo) {
      res.status(404).json({ message: 'No blog post found with this id' });
      return;
    }
    const post = blogPostInfo.get({ plain: true });
    // console.log(post);
    // console.log( `Logged In? [${req.session.loggedIn}] : Rendering: blogPost...` );
    res.render('blogPost', { post, loggedIn: req.session.loggedIn });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });
});

// =============================================================================================
router.get('/blogpost-comments', (req, res) => {
  BlogPost.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'subject',
      'description',
      'date_created'
    ],
    include: [
      {
        model: BlogComment,
        attributes: ['id', 'blog_comment', 'post_id', 'user_id', 'date_created'],
        include: {
          model: User,
          attributes: ['name']
        }
      },
      {
        model: User,
        attributes: ['name']
      }
    ]
  })
  .then(blogPostInfo => {
    if ( !blogPostInfo ) {
      res.status(404).json({ message: 'No post found with this id' });
      return;
    }
    const post = blogPostInfo.get({ plain: true });
    res.render('blogpostcomments', { post, loggedIn: req.session.loggedIn });
  })
  .catch(err => {
    console.log(err);
    res.status(500).json(err);
  });

});

module.exports = router;
