require('dotenv').config()

const Product = require('../models/ProductModel');

const bcryptjs = require('bcryptjs');
const jsonwebtoken = require('jsonwebtoken');