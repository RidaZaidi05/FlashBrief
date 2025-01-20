// lib/abac.js
import AccessPolicy from '../models/AccessPolicy';
import User from '../models/User';

function evaluateCondition(user, condition) {
  const { attribute, operator, value } = condition;

  // Fetch the user attribute dynamically based on the condition
  const userAttribute = user[attribute];

  switch (operator) {
    case '==':
      return userAttribute == value;
    case '>':
      return userAttribute > value;
    case '<':
      return userAttribute < value;
    default:
      return false;
  }
}

function applyNegation(result, negation) {
  return negation ? !result : result;
}

function evaluateLogicalConditions(user, conditions, logicalOperators, negations) {
  let result = evaluateCondition(user, conditions[0]);
  result = applyNegation(result, negations[0]);

  for (let i = 1; i < conditions.length; i++) {
    const currentCondition = evaluateCondition(user, conditions[i]);
    const operator = logicalOperators[i - 1];
    const negation = negations[i];

    // Apply negation to the current condition
    const finalResult = applyNegation(currentCondition, negation);

    // Combine conditions based on the logical operator
    switch (operator) {
      case 'AND':
        result = result && finalResult;
        break;
      case 'OR':
        result = result || finalResult;
        break;
      default:
        result = result && finalResult; // Default to AND if no operator is defined
        break;
    }
  }

  return result;
}

export async function checkAccess(userId, resource) {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error('User not found');
  }

  // Get the access policy for the resource
  const policy = await AccessPolicy.findOne({ resource });
  if (!policy) {
    throw new Error('Access policy not found');
  }

  const { conditions, logicalOperators, negations } = policy;

  // Evaluate the conditions with logical operators and negations
  return evaluateLogicalConditions(user, conditions, logicalOperators, negations);
}
