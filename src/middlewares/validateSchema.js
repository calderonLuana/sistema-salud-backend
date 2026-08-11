function validateSchema(schema) {
  return (req, res, next) => {
    console.log("SCHEMA RECIBIDO:", schema);

    if (!schema) {
      return res.status(500).json({
        error: "El schema no fue recibido correctamente",
      });
    }

    const { error } = schema.validate(req.body);

    if (error) {
      return res.status(400).json({
        error: error.details[0].message,
      });
    }

    next();
  };
}

module.exports = validateSchema;